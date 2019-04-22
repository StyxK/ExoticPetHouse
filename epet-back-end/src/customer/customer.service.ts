import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Address } from 'src/address/address.entity';
import { CustomerDTO, CustomerRO } from './customer.dto';

@Injectable()

export class CustomerService extends UserService{
    constructor(@InjectRepository(Customer) private readonly customerRepository:Repository<Customer>){
        super(customerRepository)
    }

    async showAll(){
        const user = await this.customerRepository.find({relations:['address']});
        return await user.map( customer => customer.toResponObject(false))
    }

    // async register(data:Partial<CustomerDTO>):Promise<CustomerRO>{
    //     const {userName} = data
    //     let user = await this.userRepository.findOne({where:{userName}})
    //     if(user){
    //         throw new HttpException(
    //             'User already exist',HttpStatus.BAD_REQUEST
    //         )
    //     }
    //     user = await this.userRepository.create(data)
    //     await this.userRepository.save(user)
    //     return user.toResponObject()
    // }

    async update(userName:string,data:Partial<CustomerDTO>):Promise<Customer>{
        await this.customerRepository.update(userName,data)
        return this.customerRepository.findOne({userName:data.userName})
    }
}
