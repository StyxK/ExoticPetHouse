import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {

    constructor(private readonly storesService:StoreService){}

    @Get('/store')
    async showAll(){
        await console.log('get from store')
        await this.storesService.showAll()
    }

    @Get('/store/:id')
    async showById(@Param() id){
        await this.storesService.showById(id)
    }

    @Post('store')
    async createStore(@Body() data){
        await this.storesService.create(data)
    }

    @Put('store/:id')
    async updateStore(@Param() id,@Body() data){
        await this.storesService.update(id,data)
    }

    @Delete('store/:id')
    async deleteStore(@Param() id){
        await this.storesService.delete(id)
    }

}
