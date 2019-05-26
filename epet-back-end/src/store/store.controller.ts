import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {

    constructor(private readonly storesService:StoreService){}

    @Get('/')
    async showAll(){
        await console.log('get from store')
        return await this.storesService.showAll()
    }

    @Get('/search/:keyword')
    async showByKeyword(@Param("keyword") keyword){
        return await this.storesService.showByKeyword(keyword)
    }

    @Get('/:id')
    async showById(@Param() id){
        return await this.storesService.showById(id)
    }

    @Post('/')
    async createStore(@Body() data){
        return await this.storesService.create(data)
    }

    @Put('/:id')
    async updateStore(@Param() id,@Body() data){
        return await this.storesService.update(id,data)
    }

    @Delete('/:id')
    async deleteStore(@Param() id){
        return await this.storesService.delete(id)
    }

}
