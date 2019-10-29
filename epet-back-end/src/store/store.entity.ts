import { StoreOwner } from "../storeowner/storeowner.entity";
import { Employee } from "../employee/employee.entity";
import { Order } from "../order/order.entity";
import { Feedback } from "../feedback/feedback.entity";
import { Cage } from "../cage/cage.entity";
import { Address } from "../address/address.entity";
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Chat } from "../chat/chat.entity";
import { StoreNotification } from "../notification/notification.store.entity";
import { CageType } from "../cage/cage.type.entity";
@Entity()
export class Store {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    maxOfDeposit: number;

    @Column({nullable:true})
    banned: boolean

    @Column({type:'double precision'})
    rating: number;

    @ManyToOne(type => StoreOwner,owner => owner.stores)
    @JoinColumn({
        name: 'ownerUserName',
    })
    owner: StoreOwner;

    @OneToMany(type => Employee,employee => employee.store)
    employees: Employee[];

    @ManyToOne(type => Address)
    address: Address;

    @OneToMany(type => CageType,cageType => cageType.store)
    cageType: CageType[];

    @OneToMany(type => Order,order => order.store)
    orders: Order[];

    @OneToMany(type => Feedback,feedback => feedback.store)
    feedbacks: Feedback[];

    @OneToMany(type => Chat,chats => chats.store)
    chats: Chat[];

    @OneToMany(type => StoreNotification,notifications => notifications.store)
    notifications: StoreNotification[];
}