import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";
import { Pet } from "../pet/pet.entity";
import { PetActivity } from "../petactivity/petactivity.entity";

@Entity()
export class OrderLine {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Pet, pet => pet.orderLines)
    pet: Pet;

    @ManyToOne(type => Order, order => order.orderLines)
    order: Order;

    @OneToMany(type => PetActivity, activity => activity.orderLine)
    activitys: PetActivity[];
}