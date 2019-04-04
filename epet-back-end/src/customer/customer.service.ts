import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Address } from 'src/address/address.entity';
import { User } from 'src/user/user.entity';
import { CustomerDTO } from './customer.dto';

@Injectable()

export class CustomerService extends UserService{
    constructor(@InjectRepository(Customer) private readonly customerRepository:Repository<Customer>,
                @InjectRepository(Address) private readonly addressRepository:Repository<Address>){
        super(customerRepository)
    }

    async showAll():Promise<User[]>{
        return this.customerRepository.find({relations:['address']})
    }

    async showById(userName:string):Promise<User>{
        return this.customerRepository.findOne({where:userName,relations:['address']})
    }

    async create(data:Partial<CustomerDTO>):Promise<Customer>{
        await this.addressRepository.create(data.address)
        await this.addressRepository.save(data.address)
        const customer = await this.customerRepository.create(data)
        await this.customerRepository.save(data)
        return customer
    }

    async update(userName:string,data:Partial<CustomerDTO>):Promise<Customer>{
        await this.customerRepository.update(userName,data)
        return this.customerRepository.findOne({userName:data.userName})
    }
}
