import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Store} from './store.entity';
import { StoreDTO } from './store.dto';
import { Address } from 'src/address/address.entity';
import { AddressDTO } from 'src/address/address.dto';

@Injectable()
export class StoreService {
    constructor(@InjectRepository(Store) private readonly storesRepository:Repository<Store>
    ,@InjectRepository(Address) private readonly addressRepository:Repository<Address>){}

    async showAll(){
        return await this.storesRepository.find({relations:['address']});
    }

    async create(data : Partial<StoreDTO>){
        await this.addressRepository.create(data.address)
        await this.addressRepository.save(data.address)
        const store = await this.storesRepository.create({...data,address:data.address})
        await this.storesRepository.save(data)
        return {...store,address:store.address}
    }

    async showById(id :string){
        return this.storesRepository.findOne({where:id,relations:['address']})
    }

    async update(id:string , data : Partial<StoreDTO>){
        await this.storesRepository.update(id,data)
        return this.storesRepository.findOne({where:id})
    }

    async delete(id:string){
        await this.storesRepository.delete(id);
        return {deleted : true}
    }
}
