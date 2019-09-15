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

    async showByOrderLineId(id:string) : Promise<PetActivity[]>{
        const activities = await this.PetActivityRepository.find({where:{orderLine:id},order:{date:'DESC'}})
        return await activities
    }

    async create(data: PetActivityDTO): Promise<PetActivity> {
        const dataWithDate = await ({...data,date: new Date()})
        const petActivity = await this.PetActivityRepository.create(dataWithDate);
        await this.PetActivityRepository.save(dataWithDate);
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
