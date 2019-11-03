import { StoreImage } from './store.image.entity';
import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Address } from '../address/address.entity';
import { Cage } from '../cage/cage.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';
import { CageType } from '../cage/cage.type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Store,Address,Cage,StoreOwner,CageType,StoreImage])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {}
