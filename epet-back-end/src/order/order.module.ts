import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderLine,Customer])],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
