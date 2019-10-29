import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Pet } from '../pet/pet.entity';
import { PetActivity } from '../petactivity/petactivity.entity';
import { Cage } from '../cage/cage.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Pet, pet => pet.orderLines)
  pet: Pet;

  @ManyToOne(type => Order, order => order.orderLines)
  order: Order;

  @OneToMany(type => PetActivity, activity => activity.orderLine)
  activitys: PetActivity[];

  @Column({ nullable: true })
  cageId: string;

  @ManyToOne(Type => Cage, cage => cage.orderLines)
  @JoinColumn({
    name: 'cageId',
  })
  cage: Cage;
}
