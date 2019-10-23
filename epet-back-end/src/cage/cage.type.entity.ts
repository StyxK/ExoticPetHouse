import { Cage } from './cage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class CageType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => Cage, cage => cage.cageType,{ nullable: true })
  cages: Cage[];
}
