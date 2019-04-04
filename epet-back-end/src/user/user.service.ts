import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
@Injectable()
export abstract class UserService {

    constructor(@InjectRepository(User) protected readonly userRepository:Repository<User>){}

    async showAll(){
        return await this.userRepository.find();
    }

    async showById(userName:string){
        return await this.userRepository.findOne({where:userName})
    }

    async create(data:Partial<UserDTO>){
        const user =  await this.userRepository.create(data)
        await this.userRepository.save(data)
        return user;
    }

    async update(userName:string,data:Partial<UserDTO>){
        await this.userRepository.update(userName,data)
        return this.userRepository.findOne({userName:data.userName})
    }

    async delete(userName:string){
        await this.userRepository.delete(userName)
        return {delete:true}
    }
}