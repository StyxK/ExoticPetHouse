import { Cage } from './cage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class CageType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  typeName: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => Cage, cage => cage.cageType,{ nullable: true })
  cages: Cage[];

  @Column({ type: 'double precision' , nullable: true })
  price: number;

  @Column({ type: 'double precision' , nullable: true })
  quantity: number;

  @Column({ nullable: true })
  hasCamera: boolean;

  @Column({ nullable: true })
  storeId: string;

  @ManyToOne(type => Store, store => store.cageType)
  @JoinColumn({
    name: 'storeId',
  })
  store: Store;

}

