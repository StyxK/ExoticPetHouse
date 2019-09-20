import {PrimaryColumn, Column, BeforeInsert, BeforeUpdate} from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { UserRO } from "./user.dto";
import { Logger } from "@nestjs/common";

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

    @BeforeInsert()
    async hasPassword(){
        this.password = await bcrypt.hash(this.password,10)
        await Logger.log(this.password,'password')
    }

    toResponObject(showToken:boolean = true):UserRO{
        const {userName,firstName,lastName,email,token} = this
        const responseObject : UserRO = {userName,firstName,lastName,email,token}
        if(showToken){
            responseObject.token = token
        }
        return responseObject
    }

    async comparePassword(attemp:string){
        return await bcrypt.compare(attemp,this.password)
    }

    protected get token(){
        const {userName,password} = this
        return jwt.sign({userName,password},process.env.SECRET_KEY,{expiresIn:'30d'})
    }
}
