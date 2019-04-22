import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { EmployeeDTO } from './employee.dto';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class EmployeeService extends UserService{
    constructor(@InjectRepository(Employee) private readonly employeeRepository:Repository<Employee>){
        super(employeeRepository)
    }

    // async showAll(){
    //     return this.employeeRepository.find({relations:['store']})
    // }
    async showAll(){
        const user = await this.employeeRepository.find({relations:['store']});
        return await user.map( employee => employee.toResponObject(false))
    }
    

    async update(userName:string,data:Partial<EmployeeDTO>):Promise<Employee>{
        await this.employeeRepository.update(userName,data)
        return this.employeeRepository.findOne({userName:data.userName})
    }
}
