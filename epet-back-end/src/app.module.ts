import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CageModule } from './cage/cage.module';

@Module({
  imports: [TypeOrmModule.forRoot(),StoreModule,AddressModule, CageModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
