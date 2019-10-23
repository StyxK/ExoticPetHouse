import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service'

@Controller('notification')
export class NotificationController {

    constructor(private readonly notification:NotificationService){}

    @Get('/customer/:customerName')
    async getCustomerNotification(@Param() customerName){
        return this.notification.showCustomerNotification(customerName.customerName)
    }

    @Get('/store/:storeId')
    async getStoreNotification(@Param() storeId){
        return this.notification.showStoreNotification(storeId.storeId)
    }
        
}
