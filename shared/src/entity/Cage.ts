import { Store } from "./Store";
import { Entity, PrimaryColumn, Column } from "typeorm";

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

    @Column()
    store: Store;
}