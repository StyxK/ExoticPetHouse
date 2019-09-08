import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm'
import { Store } from 'src/store/store.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({type:"character varying",nullable:false})
    message: string

    @Column({type:"int"})
    role: number

    @Column({type:"bigint"})
    time: number

    @ManyToOne(type=>Customer,customer => customer.chats)
    customer:Customer
    
    @ManyToOne(type=>Store,store=>store.chats)
    store:Store

}