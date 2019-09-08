import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { ChatDTO } from './chat.dto';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(Chat) private readonly chatRepository : Repository<Chat>){}

    async showAllChat(){
        const chat = await this.chatRepository.find()
        return chat
    }

    async showByRoom(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.find({where:{customer:data.customer,store:data.store}})
        return chat
    }

    async showChatListOfCustomer(userName:string){
        return this.chatRepository.find({where:{customer:userName}})
    }

    async showChatListOfStore(id:string){
        return this.chatRepository.find({where:{store:id}})
    }

    // async getCurrentMessage(id:string){
    //     return this.chatRepository.find({where:{store:id}})
    // }
    
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
