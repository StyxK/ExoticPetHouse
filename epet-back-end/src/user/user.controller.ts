import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export abstract class UserController {
    
    constructor(
        protected readonly userService:UserService
    ){}

    @Get('/')
    async showAll(){
        return await this.userService.showAll();
    }

    @Get('/:userName')
    async showById(@Param() userName){
        return await this.userService.showById(userName);
    }

    @Post('/')
    async createUser(@Body() data){
        return await this.userService.create(data);
    }

    @Put('/:userName')
    async updateUser(@Param() userName,@Body() data){
        return await this.userService.update(userName,data)
    }

    @Delete('/:userName')
    async deleteUser(@Param() userName){
        return await this.userService.delete(userName)
    }
}
