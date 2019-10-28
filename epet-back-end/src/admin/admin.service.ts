import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';
import { Store } from '../store/store.entity';
import { Order } from '../order/order.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository : Repository<Customer>,
        @InjectRepository(StoreOwner) private readonly storeownerRepository : Repository<StoreOwner>,
        @InjectRepository(Store) private readonly storeRepository : Repository<Store>,
        @InjectRepository(Order) private readonly orderRepository : Repository<Order>,
    ){}

    async totalUser(){
        const customerNumber = await this.customerRepository.count()
        const providerNumber = await this.storeownerRepository.count()
        const storeNumber = await this.storeRepository.count()
        return {customerNumber,providerNumber,storeNumber}
    }

    async filterByZone(filterString:string){
        let filtered = {northern:[],northeastern:[],central:[],western:[],eastern:[],southern:[]}
        let rawData
        if(filterString == 'store'){
            rawData = await this.storeRepository.find({relations:['address']})
        }
        else if(filterString == 'customer'){
            rawData = await this.customerRepository.find({relations:['address']})
        }
        rawData.map( data=> {
            if(data.address){
                const postcode = data.address.postcode.charAt(0)
                switch(postcode){
                    case '6' : filtered.central.push(data); break
                    case '1' : filtered.central.push(data); break
                    case '2' : filtered.eastern.push(data); break
                    case '3' : filtered.northeastern.push(data);break
                    case '4' : filtered.northeastern.push(data);break
                    case '5' : filtered.northern.push(data);break
                    case '7' : filtered.western.push(data);break
                    case '8' : filtered.southern.push(data);break
                    case '9' : filtered.southern.push(data);break
                }
            }
        })
        return filtered
    }

    async OrderSequence(){
        const order = await this.orderRepository
            .createQueryBuilder('order')
            .select(`to_char("order"."submitDate",'Mon') as mon,count("order"."submitDate") as "amount"`)
            .groupBy(`1`)
            .getRawMany()
        return order
    }

    async approveStoreOwner(data){
        const approved = await this.storeownerRepository.update({userName:data.userName},{approved:data.approved})
        return approved
    }

    async banStore(data){
        const banned = await this.storeRepository.update({id:data.id},{banned:data.banned})
    }

}
