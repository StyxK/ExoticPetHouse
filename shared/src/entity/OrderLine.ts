import { Pet } from "./Pet";

import { Order } from "./Order";

import { PetActivity } from "./PetActivity";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class OrderLine {

    @PrimaryColumn()
    id: string;

    @Column()
    transportation: string;

    @Column()
    submitDate: Date;

    @Column()
    pets: Pet[]

    @Column()
    order: Order;

    @Column()
    activitys: PetActivity[];
}