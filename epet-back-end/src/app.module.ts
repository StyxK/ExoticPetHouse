import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [TypeOrmModule.forRoot(),StoreModule,AddressModule, CageModule, OrderModule,StoreownerModule, EmployeeModule, CustomerModule, PetModule, OrderLineModule, PetActivityModule, FeedbackModule],
  controllers: [AppController, PetController,],
  providers: [AppService, PetService,],
})
export class AppModule {}
