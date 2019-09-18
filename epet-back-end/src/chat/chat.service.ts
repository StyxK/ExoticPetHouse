import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Chat } from './chat.entity';
import { ChatDTO } from './chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRepository : Repository<Chat>
    ){}

    async showAllChat(){
        const chat = await this.chatRepository.find()
        return chat
    }

    async customerChatRoom(username:string){
        const customer = JSON.parse(JSON.stringify(username)).username
        const chatRooms = await this.chatRepository.find({
            where:{
                customerUsername:customer
            },
            relations:['store','customer']
        })
        return chatRooms
    }

    async storeChatRoom(storeId:string){
        const store = JSON.parse(JSON.stringify(storeId)).storeId
        const subquery = await this.chatRepository
        .createQueryBuilder('chat')
        .select('chat.customerUsername')
        .addSelect('chat.store')
        .addSelect('max(chat.time)')
        .addGroupBy('chat.customerUsername')
        .addGroupBy('chat.store')
        .where(`chat.store = '${store}'`)
        .getQuery()
        const message = await this.chatRepository
        .createQueryBuilder('chat')
        .innerJoin(`(${subquery})`,'subtable',`"chat"."customerUsername" = "subtable"."chat_customerUsername"`)
        .where(`"chat"."customerUsername" = "subtable"."chat_customerUsername"`)
        .where(`"chat"."time" = "subtable"."max"`)
        .orderBy(`"chat"."time"`,'DESC')
        .getRawMany()
        return message
    }
    
    async showByRoom(data:Partial<ChatDTO>){
        Logger.log('')
        const chat = await this.chatRepository.find({where:{
            customerUsername:data.customer,
            store:data.store
        }})
        return chat
    }
    
    async sendMessage(data:Partial<ChatDTO>){
        Logger.log(data,'data')
        const chat = await this.chatRepository.create({...data})
        await this.chatRepository.save(chat)
        return chat
    }

    async deleteChat(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.delete({...data})
        return {delete:true}
    }

}
