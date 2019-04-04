import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetActivityDTO } from './petactivity.dto';
import { PetActivity } from './petactivity.entity';

@Injectable()
export class PetActivityService {
    constructor(@InjectRepository(PetActivity) private readonly PetActivityRepository: Repository<PetActivity>) { }

    async showAll(): Promise<PetActivity[]> {
        return this.PetActivityRepository.find();
    }

    async showById(id: string): Promise<PetActivity> {
        return this.PetActivityRepository.findOne({ where: id });
    }

    async create(data: PetActivityDTO): Promise<PetActivity> {
        const petActivity = await this.PetActivityRepository.create(data);
        await this.PetActivityRepository.save(data);
        return petActivity;
    }

    async update(id: string, data: PetActivityDTO): Promise<PetActivity> {
        await this.PetActivityRepository.update(id, data);
        return this.PetActivityRepository.findOne({ where: id });
    }

    async delete(id: string): Promise<{ delete: boolean }> {
        await this.PetActivityRepository.delete(id);
        return { delete: true };
    }
}
