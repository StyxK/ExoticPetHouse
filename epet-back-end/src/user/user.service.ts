import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
@Injectable()
export class UserService {

    constructor(@InjectRepository(User) protected readonly userRepository:Repository<User>){}

    async showAll():Promise<UserRO[]>{
        const user = await this.userRepository.find();
        return user.map( user => user.toResponObject(false))
    }

    async showUser(userName:string):Promise<UserRO>{
        const user =  await this.userRepository.findOne({where:userName})
        return user.toResponObject(false)
    }

    async login(data:Partial<UserDTO>):Promise<UserRO>{
        const {userName,password} = data
        const user = await this.userRepository.findOne({where:{userName}})
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Invalid user/password',HttpStatus.BAD_REQUEST
            )   
        }
        return user.toResponObject()
    }

    async register(data:Partial<UserDTO>):Promise<UserRO>{
        const {userName} = data
        let user = await this.userRepository.findOne({where:{userName}})
        if(user){
            throw new HttpException(
                'User already exist',HttpStatus.BAD_REQUEST
            )
        }
        user = await this.userRepository.create(data)
        await this.userRepository.save(user)
        return user.toResponObject()
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
