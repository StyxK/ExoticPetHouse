import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreOwner } from './storeowner.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserDTO, UserRO } from '../user/user.dto';

@Injectable()
export class StoreownerService extends UserService {
    constructor(@InjectRepository(StoreOwner) private readonly storeOwnerRepository:Repository<StoreOwner>) {
        super(storeOwnerRepository)

    }

    async login(data:Partial<UserDTO>):Promise<UserRO>{
        const {userName,password} = data
        const user = await this.storeOwnerRepository.findOne({where:{userName}})
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Invalid user/password',HttpStatus.BAD_REQUEST
            )   
        }
        return user.toResponObject()
    }

    async showAll(){
        const user = await this.storeOwnerRepository.find();
        return user.map( user => user.toResponObject(false))
    }

    async register(data:Partial<UserDTO>):Promise<UserRO>{
        const {userName} = data
        let user = await this.storeOwnerRepository.findOne({where:{userName}})
        if(user){
            throw new HttpException(
                'User already exist',HttpStatus.BAD_REQUEST
            )
        }
        user = await this.storeOwnerRepository.create({...data,approved:false})
        await this.userRepository.save(user)
        return user.toResponObject()
    }
    
}
