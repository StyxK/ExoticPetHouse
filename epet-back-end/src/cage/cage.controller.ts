import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CageService } from './cage.service';

@Controller('cage')
export class CageController {
    constructor(private readonly cageService:CageService){}

    @Get(":id")
    async showById(@Param() storeId){
        return this.cageService.showAll(storeId);
    }

    @Post(":id")
    async createCage(@Param() id,@Body() data){
        return this.cageService.create(id,data);
    }

    @Put(":id")
    async updateCage(@Param() id,@Body() data){
        return this.cageService.update(id,data);
    }

    @Delete(":id")
    async deleteCage(@Param() id){
        return this.cageService.delete(id);
    }
}
