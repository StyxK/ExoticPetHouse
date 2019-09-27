import { Injectable, Logger } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreDTO } from './store.dto';
import { Address } from '../address/address.entity';
import { Cage } from '../cage/cage.entity';
import { StoreOwner } from '../storeowner/storeowner.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Cage) private readonly cageRepository: Repository<Cage>,
    @InjectRepository(StoreOwner)
    private readonly storeOwnerRepository: Repository<StoreOwner>
  ) {}

  async showAll() {
    return await this.storesRepository.find({ relations: ['address'] });
  }

  async showByOwner(userName:string){
    await console.log('searching .... '+userName)
    const stores = await this.storesRepository.find({where:{owner:userName}})
    return stores
  }

  async create(userName: string,data: Partial<StoreDTO>) {
    const user = await this.storeOwnerRepository.findOne({where:{userName:userName}})
    await this.addressRepository.create(data.address);
    await this.addressRepository.save(data.address);
    const store = await this.storesRepository.create({
      ...data,
      address: data.address,
      owner:user
    });
    await this.storesRepository.save(store);
    return { ...store, address: store.address };
  }

  async showById(id: string) {
    const store = await this.storesRepository.findOne({
      where: id,
      relations: ['address'],
    });
    const cage = await this.cageRepository.find({ store: store });
    return { ...store, cage };
  }

  async showByKeyword(keyword: string) {
    const stores = await this.storesRepository
      .createQueryBuilder()
      .where('LOWER(name) LIKE LOWER(:name)', { name: '%' + keyword + '%' })
      .getMany();
    return stores;
  }

  async update(id: string, data: Partial<StoreDTO>) {
    await this.storesRepository.update(id, data);
    return this.storesRepository.findOne({ where: id });
  }

  async delete(id: string) {
    await this.storesRepository.delete(id);
    return { deleted: true };
  }
}
