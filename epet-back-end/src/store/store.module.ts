import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Address } from '../address/address.entity';
import { Cage } from '../cage/cage.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Store,Address,Cage,StoreOwner])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {}
