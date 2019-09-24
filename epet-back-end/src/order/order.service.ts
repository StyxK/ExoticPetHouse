import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';
import { Pet } from 'src/pet/pet.entity';

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
    const duration = await this.calculateDate(order.startDate, order.endDate);
    for (let orderLine in orderLines)
      totalPrice += orderLines[orderLine].cage.price * duration;
    return { ...order, orderLines, totalPrice, duration };
  }

  async update(id: string, data: Partial<OrderDTO>) {
    await this.orderRepository.update(id, data);
    return this.orderRepository.findOne({
      where: id,
      relations: ['orderStatus'],
    });
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

  // route for manage order

  // createOrder --> สร้าง order รอร้านตอบรับ
  async create(userName: string, data: Partial<OrderDTO>) {
    try{
      const user = await this.customerRepository.findOne({
        where: { userName: userName },
      });
      const checkPets = await data.orderLines.map( async result =>{
        const pet = await this.petRepository.findOne({where:{id:result.pet}})
        if(pet.wasDeposit)
          throw new Error('สัตว์เลี้ยงยังอยู่ในการฝาก')
        else
          return true
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
      const id = await order.orderId
      const data = await this.orderRepository.findOne({where:{id:id},relations:['orderStatus']})
      if(await data.orderStatus.id != 1){
        throw new Error('ออเดอร์นี้ไม่ได้อยู่ในสถานะร้านตอบรับ')
      }
      this.orderRepository.update(id,{orderStatus:{id:2}})
    }catch(error){
      return error.message
    }
  }

}
