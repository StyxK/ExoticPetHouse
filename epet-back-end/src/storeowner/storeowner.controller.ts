import { Controller } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { StoreownerService } from '../storeowner/storeowner.service';

@Controller('storeowner')
export class StoreownerController extends UserController{
    constructor(storeownerService:StoreownerService){
        super(storeownerService)
    }
}
