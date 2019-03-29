import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Store} from './store.entity';
import { StoreDTO } from './store.dto';

@Injectable()
export class StoreService {
    constructor(@InjectRepository(Store) private readonly storesRepository:Repository<Store>){}

    async showAll(){
        return await this.storesRepository.find();
    }

    async create(data : Partial<StoreDTO>){
        const store = await this.storesRepository.create(data)
        await this.storesRepository.save(data)
        return store
    }

    async showById(id :string){
        return this.storesRepository.findOne({where:id})
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
