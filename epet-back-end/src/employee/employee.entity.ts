import { Store } from "../store/store.entity";
import { User } from "../user/user.entity";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class Employee extends User{

    @ManyToOne(type => Store,store => store.employees)
    store: Store;
}