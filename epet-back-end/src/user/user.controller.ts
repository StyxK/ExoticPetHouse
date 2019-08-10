import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/auth.gaurd';
import { User } from '../user/user.decorator';

@Controller('')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async Login(@Body() data) {
    return await this.userService.login(data);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body() data) {
    return await this.userService.register(data);
  }

  @Get('/me')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async me(@User('userName') userName) {
    return this.userService.showUser(userName);
  }

  @Get('/users')
  @UsePipes(new ValidationPipe())
  async showAll() {
    return await this.userService.showAll();
  }

  @Get('/:userName')
  async showUser(@Param() userName) {
    return await this.userService.showUser(userName);
  }

  @Put('user/:userName')
  async updateUser(@Param() userName, @Body() data) {
    return await this.userService.update(userName, data);
  }

  @Delete('user/:userName')
  async deleteUser(@Param() userName) {
    return await this.userService.delete(userName);
  }
}
