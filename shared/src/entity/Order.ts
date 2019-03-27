import { Store } from "./Store";

import { Customer } from "./Customer";

import { OrderLine } from "./OrderLine";

import { Feedback } from "./Feedback";
import { Entity, PrimaryColumn, Column } from "typeorm";

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

    @Column()
    store: Store;

    @Column()
    customer: Customer;

    @Column()
    orderLines: OrderLine[];

    @Column()
    feedback: Feedback;
}