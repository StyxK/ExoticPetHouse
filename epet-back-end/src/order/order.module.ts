import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';
import { Pet } from '../pet/pet.entity';
import { ChargeService } from '../charge/charge.service';
import { AppNotification } from '../app.gateway';
import { StoreNotification } from '../notification/notification.store.entity';
import { CustomerNotification } from '../notification/notification.customer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderLine,Customer,OrderStatus,Pet,StoreNotification,CustomerNotification])],
    controllers: [OrderController],
    providers: [OrderService,ChargeService,AppNotification],
    exports: [OrderService],
})
export class OrderModule {}
