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
        return this.orderRepository.find();
    }

    async showById(id:string){
        const order = await this.orderRepository.findOne({where:id});
        const orderLines = await this.orderLineRepository.find({relations:['pet','cage'] , where:{order:id}})
        let totalPrice : number = 0
        for(let orderLine in orderLines)
            totalPrice += orderLines[orderLine].cage.price
        return {...order,orderLines,totalPrice}
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


}
