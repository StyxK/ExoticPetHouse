import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CageService } from './cage.service';

@Controller('cage')
export class CageController {
  constructor(private readonly cageService: CageService) {}

  @Get('/types')
  async getCageType() {
    return this.cageService.getCageType();
  }
  @Get('/types/:id')
  async showByCageTypeId(@Param() id) {
    return this.cageService.showByCageTypeId(id);
  }

  @Put('/types/:id')
  async updateSubCage(@Param() id, @Body() data) {
    return this.cageService.updateSubCage(id, data);
  }

  @Delete('/types/:id')
  async deleteSubCage(@Param() id) {
    return this.cageService.deleteSubCage(id);
  }

  @Post(':id')
  async createCages(@Param() id, @Body() data) {
    return this.cageService.createCages(id, data);
  }

  @Put(':id')
  async updateCage(@Param() id, @Body() data) {
    return this.cageService.update(id, data);
  }

  @Delete(':id')
  async deleteCage(@Param() id) {
    return this.cageService.delete(id);
  }

  @Get(':id')
  async showById(@Param() id) {
    return this.cageService.showById(id);
  }
}
