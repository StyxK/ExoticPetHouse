import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetDTO } from './pet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
    constructor(@InjectRepository(Pet) private readonly petRepository: Repository<Pet>) { }

    async showAll(): Promise<Pet[]> {
        return this.petRepository.find();
    }

    async showById(id: string): Promise<Pet> {
        return this.petRepository.findOne({ where: id });
    }

    async create(data: PetDTO): Promise<Pet> {
        const pet = await this.petRepository.create(data);
        await this.petRepository.save(data);
        return pet;
    }

    async update(id: string, data: PetDTO): Promise<Pet> {
        await this.petRepository.update(id, data);
        return this.petRepository.findOne({ where: id });
    }

    async delete(id: string): Promise<{ delete: boolean }> {
        await this.petRepository.delete(id);
        return { delete: true };
    }
}