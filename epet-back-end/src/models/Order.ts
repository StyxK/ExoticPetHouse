import { Store } from "../store/Store";

import { Customer } from "./Customer";

import { OrderLine } from "./OrderLine";

import { Feedback } from "./Feedback";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Order {

    @PrimaryColumn()
    id: string;

    @Column()
    transportation: string;

    @Column()
    submitDate: Date;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => Store,store => store.orders)
    store: Store;

    @ManyToOne(type => Customer,customer => customer.orders)
    customer: Customer;

    @OneToMany(type => OrderLine,orderLine => orderLine.order)
    orderLines: OrderLine[];

    @OneToMany(type => Feedback,feedback => feedback.order)
    feedbacks: Feedback[];
}