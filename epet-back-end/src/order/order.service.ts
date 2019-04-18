import { Injectable } from '@nestjs/common';
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
        return this.orderRepository.find({relations:['customer']});
    }

    async showById(id:string){
        return this.orderRepository.findOne({where:id});
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
