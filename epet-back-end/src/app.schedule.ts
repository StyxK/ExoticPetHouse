import { Injectable } from '@nestjs/common'
import { NestSchedule, Cron, Interval } from 'nest-schedule'
import * as moment from 'moment'
import { OrderService } from './order/order.service'

@Injectable()
export class ScheduleService extends NestSchedule{

    constructor(
        private orderService : OrderService
    ){
        super();
    }

    @Cron('0 0 2 * *',{
        startTime : new Date(new Date().toLocaleDateString()),
        endTime: new Date(new Date(moment().add(1,'day').toISOString()).toLocaleDateString()),
    })
    async cronjob(){
        this.orderService.outOfTime()
        console.log('job working')
    }

}