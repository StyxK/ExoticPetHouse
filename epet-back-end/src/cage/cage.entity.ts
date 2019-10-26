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

  @Column()
  name: string;

  @ManyToOne(type => CageType, cageType => cageType.cages,{ nullable: true })
  cageType: CageType;

  @Column()
  description: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ nullable: true })
  cameraAddress: string;

  @Column({ nullable: true })
  storeId: string;

  @ManyToOne(type => Store, store => store.cages)
  @JoinColumn({
    name: 'storeId'
  })
  store: Store;

  @OneToMany(type => OrderLine, orderLines => orderLines.cage)
  orderLines: OrderLine[];
}
