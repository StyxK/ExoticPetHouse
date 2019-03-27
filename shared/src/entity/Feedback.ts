import { Customer } from "./Customer";
import { Order } from "./Order";
import { Store } from "./Store";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Feedback {

    @PrimaryColumn()
    id: string;

    @Column()
    score: number;

    @Column()
    comment: string;

    @Column()
    customer: Customer

    @Column()
    order: Order;

    @Column()
    store: Store
}