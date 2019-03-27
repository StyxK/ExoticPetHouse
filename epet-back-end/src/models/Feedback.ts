import { Customer } from "./Customer";
import { Order } from "./Order";
import { Store } from "../store/Store";
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