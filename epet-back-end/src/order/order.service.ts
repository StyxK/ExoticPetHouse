import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';
import { Pet } from '../pet/pet.entity';
import  * as moment from 'moment'
import { InjectSchedule , Schedule } from 'nest-schedule'
import { ChargeService } from '../charge/charge.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectSchedule()
    private chargeService : ChargeService
  
  ) {}

  private toResponseObject(order: Order) {
    return { ...order, customer: order.customer.toResponObject(false) };
  }

  private ensureOwnership(order: Order, userName: string) {
    if (order.customerUsername !== userName) {
      throw new HttpException('Incorect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(userName: string): Promise<Order[]>  {
    await Logger.log(userName)
    const orders = await this.orderRepository.find({
      where: {customerUsername: userName},
      relations: [
        'store',
        'orderStatus',
        'orderLines',
        'orderLines.pet',
        'orderLines.cage',
      ],
    });
    return orders;
  }

  async showOrderOfStore(storeId: string): Promise<Order[]>{
    const orders = await this.orderRepository.find({
      where : {storeId},
      relations: [
        'orderStatus',
        'orderLines',
        'orderLines.pet',
        'orderLines.cage'
      ]
    })
    return orders
  }

  async showById(id: string) {
    const order = await this.orderRepository.findOne({
      where: id,
      relations: ['orderStatus','store'],
    });
    const orderLines = await this.orderLineRepository.find({
      relations: ['pet', 'cage'],
      where: { order: id },
    });
    let totalPrice: number = 0;
    let endDate
    if(moment(order.endDate).fromNow().match('ago')){
      endDate = new Date()
    }
    else{
      endDate = order.endDate
    }
    const duration = await this.calculateDate(order.startDate, endDate);
    for (let orderLine in orderLines)
      totalPrice += orderLines[orderLine].cage.price * duration;
    return { ...order, orderLines, totalPrice, warning:`ท่านได้ค้างชำระเป็นเวลา ${duration} วัน` };
  }

  async delete(id: string) {
    await this.orderRepository.delete(id);
    return { delete: true };
  }

  async calculateDate(startDate: Date, endDate: Date) {
    const diffTime = await Math.abs(startDate.getTime() - endDate.getTime());
    return await Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async getAllStatuses() {
    return await this.orderStatusRepository.find();
  }

  async getStatus(order){
    const id = await order.orderId
    return await this.orderRepository.findOne({where:{id:id},relations:['orderStatus','orderLines']})
  }

  // route for manage order

  // createOrder --> สร้าง order รอร้านตอบรับ
  async create(userName: string, data: Partial<OrderDTO>) {
    try{
      const user = await this.customerRepository.findOne({
        where: { userName: userName },
      });
      const checkPets = await data.orderLines.map( async result =>{
        const pet = await this.petRepository.findOne({where:{id:result.pet}})
        if(pet.wasDeposit){
          throw new Error('สัตว์เลี้ยงยังอยู่ในการฝาก')
        }
        else if(pet.deletedAt != null){
          throw new Error('สัตว์เลี้ยงได้ถูกนำออกจากระบบแล้ว')
        }
        else{
          return 'nothing happend'
        }
      })
      await Promise.all(checkPets)
      await this.orderLineRepository.save(data.orderLines);
      const order = this.orderRepository.create({
        ...data,
        orderStatus:{id:1},
        customer: user,
      });
      await this.orderRepository.save(order);
      return this.toResponseObject(order);
    }catch(error){
      return error.message
    }
  }

  // order acceptance by store --> ร้านตอบรับการฝาก
  async storeAcceptance(order){
    try{
      const data = await this.getStatus(order)
      if(await data.orderStatus.id != 1){
        throw new Error('ออเดอร์นี้ไม่ได้อยู่ในสถานะรอร้านตอบรับ')
      }
      this.orderRepository.update(data.id,{orderStatus:{id:2}})
    }catch(error){
      return error.message
    }
  }

  // order Begin --> สัตว์เลี้ยงอยู่ระหว่างการฝาก
  async orderBegin(order){
    try{
      const data = await this.getStatus(order)
      const orderLines = await this.orderLineRepository.find({where:{order:data.id},relations:['pet']})
      if(await data.orderStatus.id != 2){
        throw new Error('ออเดอร์นี้ไม่ได้อยู่ในสถานะร้านตอบรับแล้ว')
      }
      await this.orderRepository.update(data.id,{orderStatus:{id:3}})
      const setPetWasDeposit = await orderLines.map( async pet => {
        await this.petRepository.update(pet.pet.id,{wasDeposit:true})
      })
      await Promise.all(setPetWasDeposit)
      return 'สัตว์เลี้ยงได้อยู่ในการรับฝากแล้ว'
    }catch(error){
      return error.message
    }
  }

  // order out of time   --> ออร์เดอร์หมดเวลาฝาก
  async outOfTime() {
    try{
      await this.orderRepository
      .createQueryBuilder()
      .update(`order`)
      .set({ orderStatus : {id:6} })
      .where(`endDate < :now`,{now:moment().utc()})
      .execute()
      return await this.orderRepository.find()
    }catch(error){
      return error.message
    }
  }

  // charge order --> จ่ายค่าบริการ
  async charge(orderId,charge){
    try{
      console.log('อิหยังวะ')
      const data = await this.getStatus(orderId)
      if(await data.orderStatus.id != 6){
        throw new Error('ออเดอร์นี้ยังไม่หมดเวลาการฝาก')
      }
      let totalPrice : number = 0
      const duration = await this.calculateDate(data.startDate, new Date());
      const calculatePrice =  await data.orderLines.map( async result=>{
        const orderLine = await this.orderLineRepository.findOne({where:{id:result.id},relations:['cage']})
        totalPrice += orderLine.cage.price * duration;
        console.log(totalPrice,'price')
        console.log(orderLine.cage.price,'price origin')
      })
      await Promise.all(calculatePrice)
      await this.chargeService.chargeFromToken({token:charge.token,amount:totalPrice})
      await this.orderRepository.update(data.id,{orderStatus:{id:9}})
    }catch(error){
      Logger.log(error.message,'error ไรวะ')
      return error.message
    }
  }


}
