import { Store } from "../store/store.entity";

import { Customer } from "../customer/customer.entity";

import { OrderLine } from "../orderline/orderline.entity";

import { Feedback } from "../feedback/feedback.entity";

import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

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
    @JoinColumn({name:'customerUsername'})
    customer: Customer;
    @Column()
    customerUsername:string

    @OneToMany(type => OrderLine,orderLine => orderLine.order)
    orderLines: OrderLine[];

    @OneToMany(type => Feedback,feedback => feedback.order)
    feedbacks: Feedback[];
}