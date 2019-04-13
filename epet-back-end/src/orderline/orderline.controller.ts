import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderLineService } from './orderline.service';

@Controller('orderline')
export class OrderLineController {
    constructor(private readonly orderLineService: OrderLineService) { }

    @Get('/')
    async showAll() {
        return this.orderLineService.showAll();
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.orderLineService.showById(id);
    }

    @Get('/order/:id')
    async showByOrderID(@Param() id){
        return this.orderLineService.showByOrderId(id);
    }

    @Post('/')
    async createOrder(@Body() data) {
        return this.orderLineService.create(data);
    }

    @Put(':id')
    async updateOrder(@Param() id, @Body() data) {
        return this.orderLineService.update(id, data);
    }

    @Delete(':id')
    async deleteOrder(@Param() id) {
        return this.orderLineService.delete(id);
    }
}
