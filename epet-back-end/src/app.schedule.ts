import { Injectable } from '@nestjs/common'
import { NestSchedule, Cron, Interval } from 'nest-schedule'
import { OrderService } from './order/order.service'

@Injectable()
export class ScheduleService extends NestSchedule{

    constructor(
        private orderService : OrderService
    ){
        super();
    }

    @Cron('0 0 * * *',{})
    async cronjob(){
        this.orderService.outOfTime()
    }

    @Interval(10000)
    async testing(){
        return true
    }

}