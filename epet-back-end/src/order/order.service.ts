import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderLine) private readonly orderLineRepository:Repository<OrderLine>,
        @InjectRepository(Customer) private readonly customerRepository:Repository<Customer>
    ){}

    private toResponseObject(order:Order){
        return {...order, customer : order.customer.toResponObject(false)} 
    }

    private ensureOwnership(order:Order,userName:string){
        if(order.customerUsername !== userName){
            throw new HttpException('Incorect User',HttpStatus.UNAUTHORIZED)
        }
    }

    async showAll(){
        const orders =  await this.orderRepository.find({relations:['orderStatus','orderLines','orderLines.pet','orderLines.cage']});
        return orders
    }

    async showById(id:string){
        const order = await this.orderRepository.findOne({where:id,relations:['orderStatus']});
        const orderLines = await this.orderLineRepository.find({relations:['pet','cage'] , where:{order:id}})
        let totalPrice : number = 0
        const duration = await this.calculateDate(order.startDate,order.endDate)
        for(let orderLine in orderLines)
            totalPrice += orderLines[orderLine].cage.price * duration
        return {...order,orderLines,totalPrice,duration}
    }

    async create(userName:string,data:Partial<OrderDTO>){
        const user = await this.customerRepository.findOne({where:{userName:userName}})
        await this.orderLineRepository.save(data.orderLines);
        const order = await this.orderRepository.create({...data,customer:user})
        await this.orderRepository.save(order);
        return this.toResponseObject(order)
    }

    async update(id:string,data:Partial<OrderDTO>){
        await this.orderRepository.update(id,data);
        return this.orderRepository.findOne({where:id,relations:['orderStatus']});
    }

    async delete(id:string){
        await this.orderRepository.delete(id);
        return {delete:true};
    }

    async calculateDate(startDate : Date,endDate : Date){
        const diffTime = await Math.abs(startDate.getTime()-endDate.getTime())
        return await Math.ceil(diffTime/(1000*60*60*24))
    }

}
