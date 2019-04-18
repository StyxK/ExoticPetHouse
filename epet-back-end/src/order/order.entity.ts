import { Store } from "../store/store.entity";

import { Customer } from "../customer/customer.entity";

import { OrderLine } from "../orderline/orderline.entity";

import { Feedback } from "../feedback/feedback.entity";

import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
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