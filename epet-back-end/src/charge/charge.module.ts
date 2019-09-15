import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';

@Module({
    providers : [ChargeService],
    controllers : [ChargeController],
    exports : [ChargeService]
})
export class ChargeModule {}
