import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { AddressDTO } from './address.dto';

@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly addressRepository : Repository<Address>){}

    async showAll(){
        return this.addressRepository.find()
    }

    async showById(id:string){
        return this.addressRepository.findOne({where:id});
    }

    async create(data:Partial<AddressDTO>){
        const address = await this.addressRepository.create(data);
        await this.addressRepository.save(data);
        return address
    }

    async update(id:string,data:Partial<AddressDTO>){
        await this.addressRepository.update(id,data);
        return this.addressRepository.find({where:id});
    }

    async delete(id:string){
        await this.addressRepository.delete(id);
        return {delete:true}
    }
}

