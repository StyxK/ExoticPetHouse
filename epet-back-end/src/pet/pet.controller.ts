import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Get('/')
    async showAll() {
        return this.petService.showAll();
    }

    @Get('/u/:userName')
    async showByUser(@Param() userName) {
        return this.petService.showByuserName(userName);
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.petService.showById(id);
    }

    @Post('/')
    async createPet(@Body() data) {
        return this.petService.create(data);
    }

    @Put(':id')
    async updatePet(@Param() id, @Body() data) {
        return this.petService.update(id, data);
    }

    @Delete(':id')
    async deletePet(@Param() id) {
        return this.petService.delete(id);
    }
}
