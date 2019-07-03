import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderLine,Customer,OrderStatus])],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
