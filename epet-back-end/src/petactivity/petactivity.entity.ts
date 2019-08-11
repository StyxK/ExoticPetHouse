import { OrderLine } from "../orderline/orderline.entity";
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PetActivity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    topic: string

    @Column()
    description: string;

    @Column({nullable : true})
    picture: string;

    @ManyToOne(type => OrderLine,orderLine => orderLine.activitys , {nullable:false})
    orderLine: OrderLine;
}