import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SportEquipmentService } from './sport-equipment.service';
import { CreateSportEquipmentDto } from './dto/create-sport-equipment.dto';
import { UpdateSportEquipmentDto } from './dto/update-sport-equipment.dto';

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
  async create(@Body() createSportEquipmentDto: CreateSportEquipmentDto): Promise<object> {
    return this.sportEquipmentService.create(createSportEquipmentDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSportEquipmentDto: UpdateSportEquipmentDto): Promise<object> {
    return this.sportEquipmentService.update(id, updateSportEquipmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.sportEquipmentService.delete(id);
  }
}
