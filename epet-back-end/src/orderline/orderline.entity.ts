import { Pet } from "../pet/pet.entity";

import { Order } from "../order/order.entity";

import { PetActivity } from "../petactivity/petactivity.entity";
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class OrderLine {

    @PrimaryColumn()
    id: string;

    @Column()
    transportation: string;

    @Column()
    submitDate: Date;

    @ManyToOne(type => Pet,pet => pet.orderLines)
    pet: Pet;

    @ManyToOne(type => Order,order => order.orderLines)
    order: Order;

    @OneToMany(type => PetActivity,activity => activity.orderLine)
    activitys: PetActivity[];
}