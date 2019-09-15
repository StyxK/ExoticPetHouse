import { Controller, Post, Body } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Controller('charge')
export class ChargeController {

    constructor(private readonly chargeService:ChargeService){}

    @Post('/')
    async chargeFromToken(@Body() data){
        return this.chargeService.chargeFromToken(data)
    }

}
