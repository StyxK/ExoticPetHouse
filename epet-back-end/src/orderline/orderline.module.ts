import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLineController } from './orderline.controller';
import { OrderLine } from './orderline.entity';
import { OrderLineService } from './orderline.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  providers: [OrderLineService],
  controllers: [OrderLineController],
  exports: [OrderLineService]
})
export class OrderLineModule { }
