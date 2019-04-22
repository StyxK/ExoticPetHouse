import { Controller, Get, Param, Post, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    
    constructor(
        protected readonly userService:UserService
    ){}

    @UsePipes(new ValidationPipe())
    @Post('login')
    async Login(@Body() data){
        return await this.userService.login(data)
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async createUser(@Body() data){
        return await this.userService.register(data);
    }

    @Get('/users')
    async showAll(){
        return await this.userService.showAll();
    }

    // @Get('user/:userName')
    // async showById(@Param() userName){
    //     return await this.userService.showById(userName);
    // }

    @Put('user/:userName')
    async updateUser(@Param() userName,@Body() data){
        return await this.userService.update(userName,data)
    }

    @Delete('user/:userName')
    async deleteUser(@Param() userName){
        return await this.userService.delete(userName)
    }
}
