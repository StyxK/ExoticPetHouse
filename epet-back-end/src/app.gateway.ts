import {WebSocketGateway,WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets'
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';

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
        this.logger.log(`Client Connected : ${client.id}`)
    }

    @SubscribeMessage('customer')
    async handleCustomerMessage(client:Socket,text:string){
        client.once('customer',data=>{
            this.logger.log(data)
            this.chat.sendMessage(data).then( (result) => {
                client.emit('customerSend',result)
            })
        })
    }

    @SubscribeMessage('shop')
    async handleShopMessage(client:Socket,text:string){
        client.once('shop',data=> {
            this.logger.log(data)
            this.chat.sendMessage(data).then( (result) => {
                client.emit('shopSend',result)
                // client.off('shop',()=>{
                //     Logger.log('unsubscribe')
                // })
            })
        })
    }
}