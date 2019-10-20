import { Controller, Get } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Controller('charge')
export class ChargeController {

    constructor(private readonly chargeService:ChargeService){}

    @Get('/balance')
    async chargeFromToken(){
        return this.chargeService.balance()
    }

}
