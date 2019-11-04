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

  async showByCageTypeId(id: string): Promise<Cage[]> {
    return this.cageRepository.find({ where: { cageTypeId: id } });
  }

  async showById(id: string): Promise<Partial<CageDTO>> {
    return this.cageRepository.findOne({ where: id });
  }
  async getCageType(): Promise<CageType[]> {
    return this.cageTypeRepository.find();
  }
  async createCages(id: string, data: Partial<CageDTO>) {
    console.log(data);
    const store = await this.storeRepository.findOne({ where: id });
    const cageType = await this.cageTypeRepository.create({
      ...data,
      store: store,
    });
    await this.cageTypeRepository.save(cageType);
    for (let i = 0; i < data.quantity; i++) {
      this.createCage(data, cageType);
    }
    return { cageType };
  }
  async createCage(data: Partial<CageDTO>, cageType: CageType) {
    console.log(data);
    const cage = await this.cageRepository.create({
      ...data,
    });
    cage.cageType = cageType;
    await this.cageRepository.save(cage);
    return { cage };
  }

  async update(id: string, data: Partial<CageDTO>) {
    await this.cageTypeRepository.update(id, data);
    return await this.cageTypeRepository.find({ where: id });
  }

  async updateSubCage(id: string, data: Partial<CageDTO>) {
    await this.cageRepository.update(id, data);
    return await this.cageRepository.find({ where: id });
  }
  
  async delete(id: string) {
    await this.cageTypeRepository.delete(id);
    return { delete: true };
  }

  async deleteSubCage(id: string) {
    const subCage = await this.cageRepository.findOne({
      where: id,
      relations: ['cageType'],
    });
    const cage = subCage.cageType;
    cage.quantity = cage.quantity - 1;
    await this.cageRepository.delete(id);
    await this.cageTypeRepository.save(cage);
    return { delete: true };
  }
}
