import { StoreOwner } from "./Owner";
import { Employee } from "./Employee";
import { Order } from "./Order";
import { Feedback } from "./Feedback";
import { Cage } from "./Cage";
import { Address } from "./Address";
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";

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

    @OneToMany(type => Employee,employee => employee.store)
    employees: Employee[];

    @ManyToOne(type => Address)
    address: Address;

    @OneToMany(type => Cage,cage => cage.store)
    cages: Cage[];

    @OneToMany(type => Order,order => order.store)
    orders: Order[];

    @OneToMany(type => Feedback,feedback => feedback.store)
    feedbacks: Feedback[];
}