import { Pet } from '../pet/pet.entity';
import { Address } from '../address/address.entity';
import { Order } from '../order/order.entity';
import { Feedback } from '../feedback/feedback.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  JoinTable,
} from 'typeorm';
import { CustomerRO } from './customer.dto';
import { Chat } from '../chat/chat.entity';

@Entity()
export class Customer extends User {
  @Column()
  phoneNumber: string;

  @OneToMany(type => Pet, pet => pet.owner)
  pets: Pet[];

  @ManyToOne(type => Address)
  address: Address;

  @OneToMany(type => Chat, chats => chats.customer)
  chats: Chat[];

  @OneToMany(type => Order, order => order.customer)
  orders: Order[];

  @OneToMany(type => Feedback, feedbacks => feedbacks.customer)
  feedbacks: Feedback[];

  toResponObject(showToken: boolean = true): CustomerRO {
    const {
      userName,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      token,
    } = this;
    const responseObject = {
      userName,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      token,
    };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }
}
