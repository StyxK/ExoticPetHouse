import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Order } from 'src/order/order.entity';

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

    @ManyToOne(type=>Order,order=>order.chats)
    order:Order

}