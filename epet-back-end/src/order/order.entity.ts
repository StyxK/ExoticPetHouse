import { Store } from '../store/store.entity';

import { Customer } from '../customer/customer.entity';

import { OrderLine } from '../orderline/orderline.entity';

import { Feedback } from '../feedback/feedback.entity';

import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { OrderStatus } from './order.status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transportation: string;

  @Column('timestamp with time zone',{ nullable: true })
  submitDate: Date;

  @Column('timestamp with time zone',{ nullable: true })
  startDate: Date;

  @Column('timestamp with time zone',{ nullable: true })
  endDate: Date;

  @Column({nullable:true})
  reason: string;

  @ManyToOne(type => Store, store => store.orders)
  @JoinColumn({ name: 'storeId'})
  store: Store;
  @Column()
  storeId : string

  @ManyToOne(type => Customer, customer => customer.orders)
  @JoinColumn({ name: 'customerUsername' })
  customer: Customer;
  @Column()
  customerUsername: string;

  @OneToMany(type => OrderLine, orderLine => orderLine.order)
  orderLines: OrderLine[];

  @OneToMany(type => Feedback, feedback => feedback.order)
  feedbacks: Feedback[];

  @ManyToOne(type => OrderStatus, orderStatus => orderStatus.orders)
  orderStatus: OrderStatus;
}
