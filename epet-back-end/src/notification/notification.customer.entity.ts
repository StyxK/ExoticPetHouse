import {Entity,Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm'
import { Customer } from '../customer/customer.entity'
import { Order } from '../order/order.entity'

@Entity()
export class CustomerNotification{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    message:string

    @Column('bigint')
    millisec:number

    @ManyToOne(type => Customer,customer => customer.notifications)
    customer : Customer

    @OneToOne(type=> Order,order => order.customerNotification)
    @JoinColumn({name:'orderId'})
    order : Order
    @Column()
    orderId : string
}