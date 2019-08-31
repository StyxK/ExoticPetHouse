import { Injectable } from '@nestjs/common';
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

    async showByRoom(userName:string,store:string){
        const chat = await this.chatRepository.find({where:{customer:userName,store:store}})
        return chat
    }

    async create(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.create({...data})
        await this.chatRepository.save(chat)
        return chat
    }

    async deleteChat(data:Partial<ChatDTO>){
        const chat = await this.chatRepository.delete({...data})
        return {delete:true}
    }

}
