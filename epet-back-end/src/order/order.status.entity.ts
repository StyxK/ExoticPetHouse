import {Entity,Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Order } from './order.entity';

@Entity()
export class OrderStatus{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    status:string

    @OneToMany(type => Order,order => order.orderStatus)
    orders : Order[];
}
