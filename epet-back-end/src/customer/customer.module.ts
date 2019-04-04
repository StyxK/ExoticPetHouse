import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Address } from 'src/address/address.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Customer,Address])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports:[CustomerService]
})
export class CustomerModule {}
