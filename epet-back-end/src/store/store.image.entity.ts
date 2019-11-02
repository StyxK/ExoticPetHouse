import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class StoreImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  storeId: string;

  @ManyToOne(type => Store, store => store.storeImages, { nullable: true })
  @JoinColumn({
    name: 'storeId',
  })
  store: Store;
}
