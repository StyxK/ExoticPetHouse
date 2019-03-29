import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService:AddressService){}

    @Get('/')
    async showAll(){
        return this.addressService.showAll();
    }

    @Get(':id')
    async showById(@Param() id){
        return this.addressService.showById(id);
    }

    @Post('/')
    async createAddress(@Body() data){
        return this.addressService.create(data);
    }

    @Put(':id')
    async updateAddress(@Param() id,@Body() data){
        return this.addressService.update(id,data);
    }

    @Delete(':id')
    async deleteAddress(@Param() id){
        return this.addressService.delete(id);
    }
}
