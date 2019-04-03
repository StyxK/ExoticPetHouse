import {PrimaryColumn, Column} from "typeorm";

export abstract class User {

    @PrimaryColumn()
    userName: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

}
