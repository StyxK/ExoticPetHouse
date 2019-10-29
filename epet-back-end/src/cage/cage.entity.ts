import { Store } from '../store/store.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { OrderLine } from '../orderline/orderline.entity';
import { CageType } from './cage.type.entity';
@Entity()
export class Cage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  cageTypeId: string;

  @ManyToOne(type => CageType, cageType => cageType.cages, { nullable: true })
  @JoinColumn({
    name: 'cageTypeId',
  })
  cageType: CageType;

  @Column({ nullable: true })
  cameraAddress: string;

  @OneToMany(type => OrderLine, orderLines => orderLines.cage)
  orderLines: OrderLine[];
}
