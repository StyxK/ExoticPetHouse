import {WebSocketGateway,WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets'
import { Logger, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';

@Injectable()
@WebSocketGateway(4001)
export class ChatGateway implements OnGatewayConnection,OnGatewayInit{

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
        this.logger.log(`Client Connected : ${client.id}`)
    }

    @SubscribeMessage('customer')
    async handleCustomerMessage(client:Socket,text:string){
        client.once('customer',data=>{
            this.chat.sendMessage(data).then( (result) => {
                this.wss.emit('customerSend',result)
            })
        })
    }

    @SubscribeMessage('shop')
    async handleShopMessage(client:Socket,text:string){
        client.once('shop',data=> {
            this.chat.sendMessage(data).then( (result) => {
                this.wss.emit('shopSend',result)
            })
        })
    }
    
}

@WebSocketGateway(4001)
export class AppNotification implements OnGatewayConnection,OnGatewayInit{
    
    @WebSocketServer()
    wss : Server

    afterInit(){}

    handleConnection(client:Socket){}

    handleNotification(message:any){
        this.wss.emit('notification','notification from server')
    }
}