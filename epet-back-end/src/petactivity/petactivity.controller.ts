import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PetActivityService } from './petactivity.service';

@Controller('petactivity')
export class PetActivityController {
    constructor(private readonly petActivityService: PetActivityService) { }

    @Get('/')
    async showAll() {
        return this.petActivityService.showAll();
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.petActivityService.showById(id);
    }

    @Post('/')
    async createOrder(@Body() data) {
        return this.petActivityService.create(data);
    }

    @Put(':id')
    async updateOrder(@Param() id, @Body() data) {
        return this.petActivityService.update(id, data);
    }

    @Delete(':id')
    async deleteOrder(@Param() id) {
        return this.petActivityService.delete(id);
    }
}
