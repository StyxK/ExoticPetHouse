import { Store } from "../store/store.entity";
import { User } from "../user/user.entity";
import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";

@Entity()
export class StoreOwner extends User {
    
    @OneToMany(type => Store,store => store.owner)
    stores: Store[];

    @Column({nullable:true})
    approved : boolean

    toResponObject(showToken:boolean = true){
        const {userName,firstName,lastName,email,token,approved} = this
        const responseObject = {userName,firstName,lastName,email,approved,token}
        if(showToken){
            responseObject.token = token
        }
        return responseObject
    }
}