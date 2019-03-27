import { Store } from "./Store";
import { User } from "./User";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class StoreOwner extends User {
    
    @PrimaryColumn()
    store: Store;
}