import { OrderLine } from "./OrderLine";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class PetActivity {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    picture: string;

    @ManyToOne(type => OrderLine,orderLine => orderLine.activitys)
    orderLine: OrderLine;
}