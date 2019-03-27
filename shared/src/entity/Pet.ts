import { Customer } from "./Customer";
import { OrderLine } from "./OrderLine";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Pet {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    typeOfPet: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    congenitalDisease: string;

    @Column()
    allergicDrugs: string;

    @Column()
    allergicFoods: string;

    @Column()
    favThing: string;

    @Column()
    hateThing: string;

    @Column()
    wasDeposit: boolean;

    @ManyToOne(type => Customer,customer => customer.pets)
    owner: Customer;

    @OneToMany(type => OrderLine,orderLine => orderLine.pet)
    orderLines: OrderLine[];
}