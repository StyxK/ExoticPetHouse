import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Customer } from '../customer/customer.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({type:"character varying",nullable:false})
    message: string

    @Column({type:"int",nullable:true})
    role: number

    @Column({type:"bigint",nullable:true})
    time: number

    @ManyToOne(type=>Store,store=>store.chats)
    store:Store

    @ManyToOne(type=>Customer,customer=>customer.chats)
    @JoinColumn({name:"customerUsername"})
    customer:Customer
    @Column()
    customerUsername:string

}