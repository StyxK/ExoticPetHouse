import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackDTO } from './feedback.dto';
import { Feedback } from './feedback.entity';
import { Customer } from '../customer/customer.entity';
import { Order } from '../order/order.entity';

@Injectable()
export class FeedbackService {
    constructor(@InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>) { }

    async showAll(): Promise<Feedback[]> {
        return this.feedbackRepository.find();
    }

    async showById(id: string): Promise<Feedback> {
        return this.feedbackRepository.findOne({ where: id });
    }

    async create(data: FeedbackDTO): Promise<Feedback> {
        const pet = await this.feedbackRepository.create(data);
        await this.feedbackRepository.save(data);
        return pet;
    }

    async update(id: string, data: FeedbackDTO): Promise<Feedback> {
        const feedback = await this.feedbackRepository.findOne({ where: id, relations: ['customer', 'order'] });
        if (feedback.customer.userName != data.customer.userName) {
            throw "Username mismatch"
        }
        if (feedback.order.id != data.order.id) {
            throw "order mismatch"
        }
        await this.feedbackRepository.update(id, data);
        return this.feedbackRepository.findOne({ where: id });
    }

    async delete(id: string): Promise<{ delete: boolean }> {
        await this.feedbackRepository.delete(id);
        return { delete: true };
    }
}
