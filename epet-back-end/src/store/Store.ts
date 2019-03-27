import { StoreOwner } from "../models/StoreOwner";
import { Employee } from "../models/Employee";
import { Order } from "../models/Order";
import { Feedback } from "../models/Feedback";
import { Cage } from "../models/Cage";
import { Address } from "../models/Address";
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

    @ManyToOne(type => StoreOwner,owner => owner.stores)
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