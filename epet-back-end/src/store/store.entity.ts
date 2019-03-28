import { StoreOwner } from "../storeowner/storeowner.entity";
import { Employee } from "../employee/employee.entity";
import { Order } from "../order/order.entity";
import { Feedback } from "../feedback/feedback.entity";
import { Cage } from "../cage/cage.entity";
import { Address } from "../address/address.entity";
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