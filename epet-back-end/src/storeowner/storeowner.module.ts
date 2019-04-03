import { Module } from '@nestjs/common';
import { StoreownerService } from './storeowner.service';
import { StoreownerController } from './storeowner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreOwner } from './storeowner.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StoreOwner])],
  providers: [StoreownerService],
  controllers: [StoreownerController],
  exports:[StoreownerService]
})
export class StoreownerModule {}
