import { Injectable, Logger } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Store} from './store.entity';
import { StoreDTO } from './store.dto';
import { Address } from 'src/address/address.entity';
import { Cage } from 'src/cage/cage.entity';

@Injectable()
export class StoreService {
    constructor(@InjectRepository(Store) private readonly storesRepository:Repository<Store>
    ,@InjectRepository(Address) private readonly addressRepository:Repository<Address>
    ,@InjectRepository(Cage) private readonly cageRepository:Repository<Cage>){}

    async showAll(){
        return await this.storesRepository.find({relations:['address']});
    }

    async create(data : Partial<StoreDTO>){
        await this.addressRepository.create(data.address)
        await this.addressRepository.save(data.address)
        const store = await this.storesRepository.create({...data,address:data.address})
        await this.storesRepository.save(data)
        Logger.log(store)
        return {...store,address:store.address}
    }

    async showById(id :string){
        const store = await this.storesRepository.findOne({where:id,relations:['address']})
        const cage = await this.cageRepository.find({store:store})
        return {...store,cage}
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
