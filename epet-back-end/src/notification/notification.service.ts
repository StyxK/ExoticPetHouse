import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerNotification } from './notification.customer.entity';
import { StoreNotification } from './notification.store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDTO } from 'src/order/order.dto';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(CustomerNotification) private readonly customerNotification:Repository<CustomerNotification>,
        @InjectRepository(StoreNotification) private readonly storeNotification:Repository<StoreNotification>,
    ){}

    async showCustomerNotification(customer:string){
        const notification = await this.customerNotification.find({where:{customer:customer}})
        return notification
    }

    async showStoreNotification(store:string){
        const notification = await this.storeNotification.find({where:{store:store}})
        return notification
    }

    //use by customer
    async pushStoreNotification(order:Partial<OrderDTO>,store){
        const notification = this.storeNotification.create({
            message: JSON.stringify(order),
            millisec: new Date().getMilliseconds(),
            store:store
        })
        await this.storeNotification.save(notification)
        return await this.storeNotification.find({where:{store:store}})
    }

    //use by store
    async pushCustomerNotification(order:Partial<OrderDTO>,customer){
        const notification = this.customerNotification.create({
            message: JSON.stringify(order),
            millisec: new Date().getMilliseconds(),
            customer:customer
        })
        await this.customerNotification.save(notification)
        return await this.customerNotification.find({where:{customer:customer}})
    }
}
