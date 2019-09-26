import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';
import { Pet } from 'src/pet/pet.entity';
import { ChargeService } from 'src/charge/charge.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderLine,Customer,OrderStatus,Pet])],
    controllers: [OrderController],
    providers: [OrderService,ChargeService],
    exports: [OrderService],
})
export class OrderModule {}
