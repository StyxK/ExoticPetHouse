import {Entity,Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm'
import { Store } from '../store/store.entity'
import { Order } from '../order/order.entity'

@Entity()
export class StoreNotification{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    message:string

    @Column('bigint')
    millisec:number

    @ManyToOne(type => Store,store => store.notifications)
    store : Store

    @OneToOne(type=> Order,order => order.storeNotification)
    @JoinColumn({name:'orderId'})
    order : Order
    @Column()
    orderId : string

}