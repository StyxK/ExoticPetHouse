import { Store } from "./Store";
import { User } from "./User";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Employee extends User{

    @PrimaryColumn()
    store: Store;
}