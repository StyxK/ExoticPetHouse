import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { AuthGuard } from '../shared/auth.gaurd';
import { User } from '../user/user.decorator';

@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Get('/')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    async showAll(@User('userName') userName ) {
        return this.petService.showByuserName(userName);
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.petService.showById(id);
    }

    @Post('/')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    async createPet(@User('userName') userName,@Body() data) {
        return this.petService.create(userName, data);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    async updatePet(@User('userName') userName,@Param() id, @Body() data) {
        return this.petService.update(userName,id, data);
    }

    @Delete(':id')
    async deletePet(@Param() id) {
        return this.petService.delete(id);
    }
}
