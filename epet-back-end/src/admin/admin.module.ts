import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/customer.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';
import { Store } from '../store/store.entity';
import { Order } from '../order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,StoreOwner,Store,Order])],
  providers: [AdminService],
  controllers: [AdminController],
  exports : [AdminService]
})
export class AdminModule {}
