import { Store } from "./Store";
import { User } from "./User";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class Employee extends User{

    @ManyToOne(type => Store,store => store.employees)
    store: Store;
}