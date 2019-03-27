import { OrderLine } from "./OrderLine";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class PetActivity {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    picture: string;

    @Column()
    orderLine: OrderLine
}