import { Controller, Get, Body, Post } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Controller('charge')
export class ChargeController {

    constructor(private readonly chargeService:ChargeService){}

    @Get('/balance')
    async balance(){
        return this.chargeService.balance()
    }

    @Post('/charge')
    async charge(@Body() token){
        return this.chargeService.chargeFromToken(token)
    }

    @Post('/token')
    async token(@Body() token){
        return this.chargeService.test()
    }
}
