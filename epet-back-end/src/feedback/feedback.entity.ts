import { Customer } from "../customer/customer.entity";
import { Order } from "../order/order.entity";
import { Store } from "../store/store.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @Column()
    comment: string;

    @Column()
    customerUserName : string;

    @Column('timestamp with time zone',{ nullable: true })
    submitDate: Date; 

    @Column()
    storeId : string;

    @Column()
    orderId : string;

    @Column({nullable:true})
    wasEdit : boolean;

    @ManyToOne(type => Customer,customer => customer.feedbacks)
    @JoinColumn({
        name: 'customerUserName',
      })
    customer: Customer;

    @ManyToOne(type => Order,order => order.feedbacks)
    @JoinColumn({
      name: 'orderId',
    })
    order: Order;

    @ManyToOne(type => Store,store => store.feedbacks)
    @JoinColumn({
      name: 'storeId',
    })
    store: Store;
}