import {Entity,Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Customer } from 'src/customer/customer.entity'

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
}