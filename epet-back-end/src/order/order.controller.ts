import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../shared/auth.gaurd';
import { User } from '../user/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private logData(options: any) {
    options.user && Logger.log('USER ' + JSON.stringify(options.user));
    options.body && Logger.log('DATA ' + JSON.stringify(options.body));
    options.id && Logger.log('ID ' + JSON.stringify(options.id));
  }

  @Get('statuses')
  async getAllStatuses() {
    return this.orderService.getAllStatuses();
  }

  @Get('/')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async showAll(@User('userName') userName) {
    return this.orderService.showAll(userName);
  }

  @Get(':id')
  async showById(@Param() id) {
    return this.orderService.showById(id);
  }

  @Get('/store/:id')
  @UseGuards(new AuthGuard())
  async showOrderOfStore(@Param() id){
    return this.orderService.showOrderOfStore(id)
  }

  @Post('/') //ลูกค้าฝากสัตว์เลี้ยง
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async createOrder(@User('userName') user, @Body() data) {
    return this.orderService.create(user, data);
  }

  @Put('/storeAccept/:orderId') //ร้านตอบรับ order
  @UseGuards(new AuthGuard())
  async storeAcceptance(@Param() orderId){
    return this.orderService.storeAcceptance(orderId)
  }

  @Put('/denyByCustomer/:orderId') //ลูกค้ายกเลิก order
  @UseGuards(new AuthGuard())
  async denyByCustomer(@Param() orderId){
    return this.orderService.denyByCustomer(orderId)
  }

  @Put('/denyByStore/:orderId') //ร้านยกเลิก
  @UseGuards(new AuthGuard())
  async denyByStore(@Param() orderId){
    return this.orderService.denyByStore(orderId)
  }

  @Put('/orderBegin/:orderId') //กำลังฝากที่ร้าน
  @UseGuards(new AuthGuard())
  async orderBegin(@Param() orderId){
    return this.orderService.orderBegin(orderId)
  }

  @Put('/charge/:orderId') //จ่ายเงิน
  @UseGuards(new AuthGuard())
  async charge(@Param() orderId,@Body() charge){
    return this.orderService.charge(orderId,charge)
  }

  @Put('/returnPets/:orderId') //คืนสัตว์เลี้ยง
  @UseGuards(new AuthGuard())
  async returnPetOrder(@Param() orderId){
    return this.orderService.returnPetOrder(orderId)
  }

  @Put('/getPetsBack/:orderId') //คืนสัตว์เลี้ยง
  @UseGuards(new AuthGuard())
  async getPetsBack(@Param() orderId){
    return this.orderService.getPetsBack(orderId)
  }

  @Delete(':id')
  async deleteOrder(@Param() id) {
    return this.orderService.delete(id);
  }

}
