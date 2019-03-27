import { Store } from "../store/Store";
import { User } from "./User";
import { Entity, PrimaryColumn, OneToMany } from "typeorm";

@Entity()
export class StoreOwner extends User {
    
    @OneToMany(type => Store,store => store.owner)
    stores: Store[];
}