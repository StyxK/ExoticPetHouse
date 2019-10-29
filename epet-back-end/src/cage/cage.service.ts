import { CageType } from './cage.type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cage } from './cage.entity';
import { Repository } from 'typeorm';
import { CageDTO } from './cage.dto';
import { Store } from '../store/store.entity';

@Injectable()
export class CageService {
  constructor(
    @InjectRepository(Cage) private readonly cageRepository: Repository<Cage>,
    @InjectRepository(CageType)
    private readonly cageTypeRepository: Repository<CageType>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}
  async showById(id: string): Promise<Partial<CageDTO>> {
    return this.cageRepository.findOne({ where: id });
  }
  async getCageType(): Promise<CageType[]> {
    return this.cageTypeRepository.find();
  }
  async create(id: string, data: Partial<CageDTO>) {
    console.log(data);
    const store = await this.storeRepository.findOne({ where: id });
    const cage = await this.cageRepository.create({ ...data, store: store });
    await this.cageRepository.save(cage);
    return { cage };
  }

  async update(id: string, data: Partial<CageDTO>) {
    await this.cageRepository.update(id, data);
    return await this.cageRepository.find({ where: id });
  }

  async delete(id: string) {
    await this.cageRepository.delete(id);
    return { delete: true };
  }
}
