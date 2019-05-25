import { Store } from "../store/store.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderLine } from "../orderline/orderline.entity";

@Entity()
export class Cage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column({type:"double precision"})
    price: number;

    @ManyToOne(type => Store,store => store.cages)
    store: Store;

    @OneToMany(type => OrderLine,orderLines => orderLines.cage)
    orderLines:OrderLine[]
    
}