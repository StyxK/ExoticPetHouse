import { User } from './user/user.decorator';
import { Store } from './store/store.entity';
import { PetActivity } from './petactivity/petactivity.entity';
import { Feedback } from './feedback/feedback.entity';
import { Customer } from './customer/customer.entity';
import { Cage } from './cage/cage.entity';
import { Address } from './address/address.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CageModule } from './cage/cage.module';
import { OrderModule } from './order/order.module';
import { StoreownerModule } from './storeowner/storeowner.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { PetModule } from './pet/pet.module';
import { OrderLineModule } from './orderline/orderline.module';
import { PetActivityModule } from './petactivity/petactivity.module';
import { FeedbackModule } from './feedback/feedback.module';
import { Employee } from './employee/employee.entity';
import { Order } from './order/order.entity';
import { OrderLine } from './orderline/orderline.entity';
import { Pet } from './pet/pet.entity';
import { StoreOwner } from './storeowner/storeowner.entity';
import { OrderStatus } from './order/order.status.entity';
import { ChatGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/chat.entity';
import { ChargeModule } from './charge/charge.module';
import { ScheduleModule } from 'nest-schedule'
import { ScheduleService } from './app.schedule';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { StoreNotification } from './notification/notification.store.entity';
import { CustomerNotification } from './notification/notification.customer.entity';
import 'dotenv/config';
import 'reflect-metadata';

@Module({
  imports: [
    ScheduleModule.register(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Address,
        Cage,
        Chat,
        Customer,
        Employee,
        Feedback,
        Order,
        OrderStatus,
        OrderLine,
        Pet,
        PetActivity,
        Store,
        StoreOwner,
        User,
        CustomerNotification,
        StoreNotification
      ],
      synchronize: true,
      logging: true,
    } as TypeOrmModuleOptions),
    StoreModule,
    AddressModule,
    CageModule,
    OrderModule,
    StoreownerModule,
    EmployeeModule,
    CustomerModule,
    PetModule,
    OrderLineModule,
    PetActivityModule,
    FeedbackModule,
    ChatModule,
    ChargeModule,
    AdminModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService,ChatGateway,ScheduleService],
})
export class AppModule {}
