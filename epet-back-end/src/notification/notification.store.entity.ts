import {Entity,Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Store } from 'src/store/store.entity'

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
}