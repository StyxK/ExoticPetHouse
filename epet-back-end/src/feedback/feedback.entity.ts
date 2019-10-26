import { Customer } from "../customer/customer.entity";
import { Order } from "../order/order.entity";
import { Store } from "../store/store.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @Column()
    comment: string;

    @Column()
    customerUserName : string;

    @ManyToOne(type => Customer,customer => customer.feedbacks)
    @JoinColumn({
        name: 'customerUserName',
      })
    customer: Customer;

    @ManyToOne(type => Order,order => order.feedbacks)
    order: Order;

    @ManyToOne(type => Store,store => store.feedbacks)
    store: Store;
}