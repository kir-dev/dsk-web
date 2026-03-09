import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RentalEquipmentService } from './rental-equipment.service';

@Controller('rental-equipment')
export class RentalEquipmentController {
  constructor(private readonly rentalEquipmentService: RentalEquipmentService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.rentalEquipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.rentalEquipmentService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<object> {
    return this.rentalEquipmentService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.rentalEquipmentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.rentalEquipmentService.delete(id);
  }
}
