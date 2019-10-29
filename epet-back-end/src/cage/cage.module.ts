import { Module } from '@nestjs/common';
import { CageService } from './cage.service';
import { CageController } from './cage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cage } from './cage.entity';
import { Store } from '../store/store.entity';
import { CageType } from './cage.type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cage,Store,CageType])],
  providers: [CageService],
  controllers: [CageController],
  exports:[CageService]
})
export class CageModule {}