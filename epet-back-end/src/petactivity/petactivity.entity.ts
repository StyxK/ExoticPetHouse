import { OrderLine } from "../orderline/orderline.entity";
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PetActivity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    picture: string;

    @ManyToOne(type => OrderLine,orderLine => orderLine.activitys)
    orderLine: OrderLine;
}