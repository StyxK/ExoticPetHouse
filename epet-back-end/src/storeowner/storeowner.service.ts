import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreOwner } from './storeowner.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StoreownerService extends UserService {
    constructor(@InjectRepository(StoreOwner) private readonly storeOwnerRepository:Repository<StoreOwner>) {
        super(storeOwnerRepository)
    }
    
}
