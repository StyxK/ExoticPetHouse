import { Controller, Get, Param, Post, Body, Delete, UseGuards, Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO } from './chat.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService : ChatService){}

    @Get('/')
    async showAllChat(){
        return this.chatService.showAllChat()
    }

    @Get('/chatRoom/:storeId')
    async chatRoom(@Param() storeId:string){
        return this.chatService.chatRoom(storeId)
    }
    
    @Post('/getMessageInRoom')
    async showByRoom(@Body() data:ChatDTO){
        return this.chatService.showByRoom(data)
    }

    @Post('/')
    async sendMessage(@Body() data:ChatDTO){
        return this.chatService.sendMessage(data)
    }

    @Delete('/')
    async deleteMessage(@Body() data:ChatDTO){
        return this.chatService.deleteChat(data)
    }
}
