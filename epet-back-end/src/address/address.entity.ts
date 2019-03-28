import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Address {

    @PrimaryColumn()
    id: string;

    @Column()
    street: string;

    @Column()
    District: string;

    @Column()
    province: string;

    @Column()
    postcode: string;
}