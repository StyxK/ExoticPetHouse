import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Chat } from './chat.entity';
import { ChatDTO } from './chat.dto';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRepository : Repository<Chat>,
        @InjectRepository(Order) private readonly orderRepository : Repository<Order>
    ){}

    async showAllChat(){
        const chat = await this.chatRepository.find()
        return chat
    }

    async customerChatRoom(username:string){
        const customer = JSON.parse(JSON.stringify(username)).username
        const chatRooms = await this.orderRepository.find({where:{customerUsername:customer,orderStatus:Not(7)}})
        return chatRooms
    }

    async storeChatRoom(storeId:string){
        const store = JSON.parse(JSON.stringify(storeId)).storeId
        const chatRooms =  await this.orderRepository
        .createQueryBuilder('order')
        .where(`"order"."storeId"::text = :id`,{id:store})
        .andWhere(`order.orderStatus != 7`)
        .getMany()
        return chatRooms
    }

    async showByRoom(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.find({where:{order:data.order}})
        return chat
    }
    
    async sendMessage(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.create({...data})
        await this.chatRepository.save(chat)
        return chat
    }

    async deleteChat(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.delete({...data})
        return {delete:true}
    }

}
