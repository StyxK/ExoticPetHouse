import { Pet } from "../pet/pet.entity";
import { Address } from "../address/address.entity";
import { Order } from "../order/order.entity";
import { Feedback } from "../feedback/feedback.entity";
import { User } from "../user/user.entity";
import { Entity, Column, ManyToOne, OneToMany, BeforeInsert } from "typeorm";
import { CustomerRO } from "./customer.dto";

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

    toResponObject(showToken:boolean = true):CustomerRO{
        const {userName,firstName,lastName,email,token,address} = this
        const responseObject = {userName,firstName,lastName,email,token,address}
        if(showToken){
            responseObject.token = token
        }
        return responseObject
    }
}