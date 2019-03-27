import { Pet } from "./Pet";

import { Order } from "./Order";

import { PetActivity } from "./PetActivity";
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