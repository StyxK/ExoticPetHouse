import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreNotification } from './notification.store.entity';
import { CustomerNotification } from './notification.customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerNotification,StoreNotification])],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports:[NotificationService]
})
export class NotificationModule {}
