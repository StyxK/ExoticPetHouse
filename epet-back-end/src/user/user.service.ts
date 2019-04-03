import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

    async showAll(){
        return this.userRepository.find();
    }

    async showById(id:string){
        return this.userRepository.findOne({where:id})
    }

    async create(data:Partial<UserDTO>){
        const user =  await this.userRepository.create(data)
        await this.userRepository.save(data)
        return user;
    }

    async update(id:string,data:Partial<UserDTO>){
        await this.userRepository.update(id,data)
        return this.userRepository.findOne({where:id})
    }

    async delete(id:string){
        await this.userRepository.delete(id)
        return {delete:true}
    }
}
