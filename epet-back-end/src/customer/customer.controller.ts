import { Controller } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UserController } from '../user/user.controller';

@Controller('customer')
export class CustomerController extends UserController {

    constructor(private readonly customerSerivce : CustomerService){
        super(customerSerivce)
    }

}
