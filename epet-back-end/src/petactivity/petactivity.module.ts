import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetActivityController } from './petactivity.controller';
import { PetActivity } from './petactivity.entity';
import { PetActivityService } from './petactivity.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetActivity])],
  exports: [PetActivityService],
  providers: [PetActivityService],
  controllers: [PetActivityController]
})
export class PetActivityModule { }
