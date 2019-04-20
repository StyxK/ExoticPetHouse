import { Injectable, Logger } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderLine } from 'src/orderline/orderline.entity';
@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderLine) private readonly orderLineRepository:Repository<OrderLine>
    ){}

    async showAll(){
        return this.orderRepository.find({relations:['orderStatus']});
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

    async create(data:Partial<OrderDTO>){
        await this.orderLineRepository.save(data.orderLines);
        const order = await this.orderRepository.save(data);
        return order
    }

    async update(id:string,data:Partial<OrderDTO>){
        await this.orderRepository.update(id,data);
        return this.orderRepository.findOne({where:id});
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
