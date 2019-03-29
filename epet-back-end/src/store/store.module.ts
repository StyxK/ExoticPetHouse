import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Address } from 'src/address/address.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Store,Address])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {}
