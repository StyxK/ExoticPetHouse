import { Store } from "../store/store.entity";
import { User } from "../user/user.entity";
import { Entity, PrimaryColumn, OneToMany } from "typeorm";

@Entity()
export class StoreOwner extends User {
    
    @OneToMany(type => Store,store => store.owner)
    stores: Store[];
}