import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

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

    @Get('/list/owner')
    @UseGuards(new AuthGuard())
    async showByOwner(@User('userName') user){
        console.log(user)
        return await this.storesService.showByOwner(user)
    }

    @Post('/')
    @UseGuards(new AuthGuard())
    async createStore(@User('userName') user,@Body() data){
        return await this.storesService.create(user,data)
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
