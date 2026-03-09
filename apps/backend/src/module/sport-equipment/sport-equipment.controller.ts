import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SportEquipmentService } from './sport-equipment.service';

@Controller('sport-equipment')
export class SportEquipmentController {
  constructor(private readonly sportEquipmentService: SportEquipmentService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.sportEquipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.sportEquipmentService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<object> {
    return this.sportEquipmentService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.sportEquipmentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.sportEquipmentService.delete(id);
  }
}
