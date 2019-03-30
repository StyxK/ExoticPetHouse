import { Module } from '@nestjs/common';
import { CageService } from './cage.service';
import { CageController } from './cage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cage } from './cage.entity';
import { Store } from 'src/store/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cage,Store])],
  providers: [CageService],
  controllers: [CageController],
  exports:[CageService]
})
export class CageModule {}