import { Store } from "../store/Store";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Cage {

    @PrimaryColumn()
    Id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @ManyToOne(type => Store,store => store.cages)
    store: Store;
}