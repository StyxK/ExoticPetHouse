import {WebSocketGateway,WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets'
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { setInterval } from 'timers';
import { ChatService } from './chat/chat.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';
import { Repository } from 'typeorm';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection,OnGatewayInit{

    constructor(
        private chat : ChatService
    ){}

    @WebSocketServer()
    wss : Server

    private logger:Logger = new Logger('AppGateWay') 

    afterInit(server:any){
        this.logger.log('Initialized')
    }

    handleConnection(client:Socket){
        // setInterval(()=>{
            this.logger.log(`Client Connected : ${client.id}`)
        //     client.emit('customer','always send every 1')
        // },5000)
    }

    @SubscribeMessage('message')
    handleMessage(client:Socket,text:string):void{
        this.logger.log(client)
        this.logger.log(text)
    }

    @SubscribeMessage('shop')
    async handleShopMessage(client:Socket,text:string){
        client.once('shop',data=> {
            this.logger.log(data)
            this.chat.sendMessage(data).then( (result) =>
                client.emit('shopSend',result)
            )
        })
    }
}