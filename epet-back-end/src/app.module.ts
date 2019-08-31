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
import { PetService } from './pet/pet.service';
import { PetController } from './pet/pet.controller';
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
import { AppGateway } from './app.gateway';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import 'dotenv/config';
import 'reflect-metadata';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Address,
        Chat,
        Cage,
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
        Chat
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
  ],
  controllers: [AppController],
  providers: [AppService,AppGateway],
})
export class AppModule {}
