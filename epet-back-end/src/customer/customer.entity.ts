import { Pet } from "../pet/pet.entity";
import { Address } from "../address/address.entity";
import { Order } from "../order/order.entity";
import { Feedback } from "../feedback/feedback.entity";
import { User } from "../user/user.entity";
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