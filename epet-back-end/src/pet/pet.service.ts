import { Customer } from './../customer/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetDTO } from './pet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
  ) {}

  async showAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async showById(id: string): Promise<Pet> {
    return this.petRepository.findOne({ where: id });
  }

  async showByuserName(userName: string): Promise<Pet[]> {
    return this.petRepository.find({
      where: { ownerUserName: userName },
    });
  }

  async create(userName: string, data: PetDTO): Promise<Pet> {
    data.wasDeposit = !!data.wasDeposit;
    data.orderLines = data.orderLines || [];
    data.owner = {
      userName,
    } as Customer;
    await this.petRepository.create(data);
    const pet = await this.petRepository.save(data);
    return pet;
  }

  async update(userName: string, id: string, data: PetDTO): Promise<Pet> {
    const oldPet = await this.petRepository.findOne({
      where: id,
      relations: ['owner'],
    });
    if (oldPet.owner.userName === userName) {
      data.owner = {
        userName,
      } as Customer;
      await this.petRepository.update(id, data);
    }
    return this.petRepository.findOne({ where: id });
  }

  async delete(id: string): Promise<{ delete: boolean }> {
    await this.petRepository.delete(id);
    return { delete: true };
  }
}
