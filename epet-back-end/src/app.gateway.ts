import {WebSocketGateway,WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets'
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection,OnGatewayInit{

    @WebSocketServer()
    wss : Server

    private logger:Logger = new Logger('AppGateWay') 

    afterInit(server:any){
        this.logger.log('Initialized')
    }

    handleConnection(client:Socket){
        this.logger.log(`Client Connected : ${client.id}`)
    }

    @SubscribeMessage('message')
    handleMessage(client:Socket,text:string):void{
        client.emit('message',text)
    }

    @SubscribeMessage('shop')
    handleShopMessage(client:Socket,text:string):void{
        client.emit('customer',"สวัสดีครับ shop")
    }
}