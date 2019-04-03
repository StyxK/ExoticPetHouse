import { Controller } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { StoreownerService } from 'src/storeowner/storeowner.service';

@Controller('storeowner')
export class StoreownerController extends UserController{
    constructor(storeownerService:StoreownerService){
        super(storeownerService)
    }
}
