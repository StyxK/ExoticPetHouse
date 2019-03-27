import { StoreOwner } from "./Owner";
import { Employee } from "./Employee";
import { Order } from "./Order";
import { Feedback } from "./Feedback";
import { Cage } from "./Cage";
import { Address } from "./Address";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Store {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    maxOfDeposit: number;

    @Column()
    rating: number;

    @Column()
    owner: StoreOwner;

    @Column()
    employees: Employee[];

    @Column()
    address: Address;

    @Column()
    cages: Cage[];

    @Column()
    orders: Order[];

    @Column()
    feedbacks: Feedback[];
}