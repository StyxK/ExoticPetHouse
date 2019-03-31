import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CageModule } from './cage/cage.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(),StoreModule,AddressModule, CageModule, OrderModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
