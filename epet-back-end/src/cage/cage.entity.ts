import { Store } from "../store/store.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { OrderLine } from "src/orderline/orderline.entity";

@Entity()
export class Cage {

    @PrimaryColumn()
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