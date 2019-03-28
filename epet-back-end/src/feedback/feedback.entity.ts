import { Customer } from "../customer/customer.entity";
import { Order } from "../order/order.entity";
import { Store } from "../store/store.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Feedback {

    @PrimaryColumn()
    id: string;

    @Column()
    score: number;

    @Column()
    comment: string;

    @ManyToOne(type => Customer,customer => customer.feedbacks)
    customer: Customer;

    @ManyToOne(type => Order,order => order.feedbacks)
    order: Order;

    @ManyToOne(type => Store,store => store.feedbacks)
    store: Store;
}