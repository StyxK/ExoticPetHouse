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

<<<<<<< HEAD
  @Column({ nullable: true })
  name: string;

=======
>>>>>>> 7e5cafe25b4e6776a12c292945da6073443b74f0
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
