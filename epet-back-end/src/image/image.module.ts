import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from "./image.controller"
import { ImageService } from "./image.service"

@Module({
  exports: [ImageService],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule { }
