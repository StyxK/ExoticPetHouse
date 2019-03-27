import { Pet } from "./Pet";
import { Address } from "./Address";
import { Order } from "./Order";
import { Feedback } from "./Feedback";
import { User } from "./User";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Customer extends User {

    @PrimaryColumn()
    phoneNumber: string;

    @Column()
    pets: Pet[];

    @Column()
    address: Address;

    @Column()
    orders: Order[];

    @Column()
    feedbacks: Feedback[];
}