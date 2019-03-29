import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Address {

    @PrimaryColumn()
    id: string;

    @Column()
    street: string;

    @Column()
    district: string;

    @Column()
    province: string;

    @Column()
    postcode: string;

    @Column({type:"double precision"})
    latitude: number;

    @Column({type:"double precision"})
    longitude: number;

}