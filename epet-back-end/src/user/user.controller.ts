import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    
    constructor(
        private readonly userService:UserService
    ){}

    @Get('/')
    async showAll(){
        return this.userService.showAll();
    }

    @Get(':id')
    async showById(@Param() id){
        return this.userService.showById(id);
    }

    @Post('/')
    async createUser(@Body() data){
        return this.userService.create(data);
    }

    @Put(':id')
    async updateUser(@Param() id,@Body() data){
        return this.updateUser(id,data)
    }

    @Delete(':id')
    async deleteUser(@Param() id){
        return this.deleteUser(id)
    }
}
