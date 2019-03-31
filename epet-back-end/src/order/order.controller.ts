import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor (private readonly orderService:OrderService){}
    
    @Get('/')
    async showAll(){
        return this.orderService.showAll();
    }

    @Get(':id')
    async showById(@Param() id){
        return this.orderService.showById(id);
    }

    @Post('/')
    async createOrder(@Body() data){
        return this.orderService.create(data);
    }

    @Put(':id')
    async updateOrder(@Param() id, @Body() data){
        return this.orderService.update(id,data);
    }

    @Delete(':id')
    async deleteOrder(@Param() id){
        return this.orderService.delete(id);
    }
}   