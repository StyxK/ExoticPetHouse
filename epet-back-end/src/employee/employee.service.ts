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

    async showAll():Promise<User[]>{
        return this.employeeRepository.find({relations:['store']})
    }

    async showById(userName:string):Promise<User>{
        return this.employeeRepository.findOne({where:userName,relations:['store']})
    }    

    async create(data:Partial<EmployeeDTO>):Promise<Employee>{
        const employee = await this.employeeRepository.create(data)
        await this.employeeRepository.save(data)
        return employee
    }

    async update(userName:string,data:Partial<EmployeeDTO>):Promise<Employee>{
        await this.employeeRepository.update(userName,data)
        return this.employeeRepository.findOne({userName:data.userName})
    }
}
