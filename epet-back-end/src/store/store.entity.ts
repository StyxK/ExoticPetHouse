import { StoreOwner } from "../storeowner/storeowner.entity";
import { Employee } from "../employee/employee.entity";
import { Order } from "../order/order.entity";
import { Feedback } from "../feedback/feedback.entity";
import { Cage } from "../cage/cage.entity";
import { Address } from "../address/address.entity";
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Store {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    maxOfDeposit: number;

    @Column({type:'double precision'})
    rating: number;

    @ManyToOne(type => StoreOwner,owner => owner.stores)
    @JoinColumn({
        name: 'ownerUserName',
    })
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