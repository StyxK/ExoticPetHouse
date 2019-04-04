import { Controller, Get, Post } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController extends UserController{
    constructor(private readonly employeeService:EmployeeService){
        super(employeeService)
    }

}
