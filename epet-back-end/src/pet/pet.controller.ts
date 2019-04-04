import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Get('/')
    async showAll() {
        return this.petService.showAll();
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.petService.showById(id);
    }

    @Post('/')
    async createOrder(@Body() data) {
        return this.petService.create(data);
    }

    @Put(':id')
    async updateOrder(@Param() id, @Body() data) {
        return this.petService.update(id, data);
    }

    @Delete(':id')
    async deleteOrder(@Param() id) {
        return this.petService.delete(id);
    }
}