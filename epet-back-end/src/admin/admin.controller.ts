import { Controller,Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService : AdminService){}

    @Get('/totalUser')
    async totalUser(){
        return this.adminService.totalUser()
    }

    @Get('/filterStoreByZone')
    async filterStoreByZone(){
        return this.adminService.filterByZone('store')
    }

    @Get('/filterCustomerByZone')
    async filterCustomerByZone(){
        return this.adminService.filterByZone('customer')
    }

    @Get('/orderSequence')
    async orderSequnce(){
        return this.adminService.OrderSequence()
    }

    @Get('/approve/:userName')
    async approve(@Param() userName){
        return this.adminService.approveStoreOwner(userName.userName)
    }

}
