import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cage } from './cage.entity';
import { Repository } from 'typeorm';
import { CageDTO } from './cage.dto';
import { Store } from 'src/store/store.entity';

@Injectable()
export class CageService {
    constructor(@InjectRepository(Cage) private readonly cageRepository:Repository<Cage>
    ,@InjectRepository(Store) private readonly storeRepository:Repository<Store>
    ){}

    async showAll(id:string){
        const store = await this.storeRepository.findOne({where:id})
        return this.cageRepository.find({store:store});
    }

    async create(id:string,data:Partial<CageDTO>){
        const store = await this.storeRepository.findOne({where:id});
        await console.log(store)
        const cage = await this.cageRepository.create({...data,store:store});
        await this.cageRepository.save(cage);
        return {cage};
    }

    async update(id:string,data:Partial<CageDTO>){
        await this.cageRepository.update(id,data);
        return await this.cageRepository.find({where:id});
    }

    async delete(id:string){
        await this.cageRepository.delete(id);
        return {delete:true};
    }
}
