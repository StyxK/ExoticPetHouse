import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Order } from 'src/order/order.entity';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Order, Customer])],
  exports: [FeedbackService],
  controllers: [FeedbackController],
  providers: [FeedbackService]

})
export class FeedbackModule { }
