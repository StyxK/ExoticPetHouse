import { Customer } from "./Customer";
import { OrderLine } from "./OrderLine";
import { Entity, PrimaryColumn, Column } from "typeorm";

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

    @Column()
    owner: Customer;

    @Column()
    orderLines: OrderLine[];
}