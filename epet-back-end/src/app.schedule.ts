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
        console.log('job working')
    }

    @Interval(2000)
    async testing(){
        this.orderService.outOfTime()
        console.log('job working')
        return true
    }

}