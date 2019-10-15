import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';
import { Store } from '../store/store.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository : Repository<Customer>,
        @InjectRepository(StoreOwner) private readonly storeownerRepository : Repository<StoreOwner>,
        @InjectRepository(Store) private readonly storeRepository : Repository<Store>
    ){}

    async totalUser(){
        const customerNumber = await this.customerRepository.count()
        const providerNumber = await this.storeownerRepository.count()
        const storeNumber = await this.storeRepository.count()
        return {customerNumber,providerNumber,storeNumber}
    }
}
