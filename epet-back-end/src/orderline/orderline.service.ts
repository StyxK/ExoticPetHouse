import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLineDTO } from './orderline.dto';
import { OrderLine } from './orderline.entity';

@Injectable()
export class OrderLineService {
    constructor(@InjectRepository(OrderLine) private readonly OrderLineRepository: Repository<OrderLine>) { }

    async showAll(): Promise<OrderLine[]> {
        return this.OrderLineRepository.find();
    }

    async showById(id: string): Promise<OrderLine> {
        return this.OrderLineRepository.findOne({ where: id });
    }

    async create(data: OrderLineDTO): Promise<OrderLine> {
        const OrderLine = await this.OrderLineRepository.create(data);
        await this.OrderLineRepository.save(data);
        return OrderLine;
    }

    async update(id: string, data: OrderLineDTO): Promise<OrderLine> {
        await this.OrderLineRepository.update(id, data);
        return this.OrderLineRepository.findOne({ where: id });
    }

    async delete(id: string): Promise<{ delete: boolean }> {
        await this.OrderLineRepository.delete(id);
        return { delete: true };
    }
}
