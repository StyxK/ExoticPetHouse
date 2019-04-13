import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository:Repository<Order>){}

    async showAll(){
        return this.orderRepository.find({relations:['customer']});
    }

    async showById(id:string){
        return this.orderRepository.findOne({where:id});
    }

    async create(data){
        const order = await this.orderRepository.create(data);
        await this.orderRepository.save(data);
        return order;
    }

    async update(id:string,data){
        await this.orderRepository.update(id,data);
        return this.orderRepository.findOne({where:id});
    }

    async delete(id:string){
        await this.orderRepository.delete(id);
        return {delete:true};
    }


}
