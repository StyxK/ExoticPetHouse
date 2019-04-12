import { Customer } from "../customer/customer.entity";
import { OrderLine } from "../orderline/orderline.entity";
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

    @Column({nullable:true})
    congenitalDisease: string;

    @Column({nullable:true})
    allergicDrugs: string;

    @Column({nullable:true})
    allergicFoods: string;

    @Column({nullable:true})
    favThing: string;

    @Column({nullable:true})
    hateThing: string;

    @Column()
    wasDeposit: boolean;

    @ManyToOne(type => Customer,customer => customer.pets)
    owner: Customer;

    @OneToMany(type => OrderLine,orderLine => orderLine.pet)
    orderLines: OrderLine[];
}