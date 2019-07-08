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

  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async createOrder(@User('userName') user, @Body() data) {
    return this.orderService.create(user, data);
  }

  @Put(':id')
  async updateOrder(@Param() id, @Body() data) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  async deleteOrder(@Param() id) {
    return this.orderService.delete(id);
  }
}
