import { Pet } from "./Pet";
import { Address } from "./Address";
import { Order } from "./Order";
import { Feedback } from "./Feedback";
import { User } from "./User";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Customer extends User {

    @Column()
    phoneNumber: string;

    @OneToMany(type => Pet,pet => pet.owner)
    pets: Pet[];

    @ManyToOne(type => Address)
    address: Address;

    @OneToMany(type => Order,order => order.customer)
    orders: Order[];

    @OneToMany(type => Feedback,feedbacks => feedbacks.customer)
    feedbacks: Feedback[];
}