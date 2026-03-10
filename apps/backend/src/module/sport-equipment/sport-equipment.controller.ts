import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { SportEquipmentService } from './sport-equipment.service';
import { CreateSportEquipmentDto } from './dto/create-sport-equipment.dto';
import { UpdateSportEquipmentDto } from './dto/update-sport-equipment.dto';
import { SportEquipment } from '@prisma/client';

@Controller('sport-equipment')
export class SportEquipmentController {
  constructor(private readonly sportEquipmentService: SportEquipmentService) {}

  @Get()
  async findAll(): Promise<SportEquipment[]> {
    return this.sportEquipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SportEquipment> {
    const sportEquipment = await this.sportEquipmentService.findOne(id);
    if (!sportEquipment) {
      throw new NotFoundException('No sport equipment found');
    }
    return sportEquipment;
  }

  @Post()
  async create(@Body() createSportEquipmentDto: CreateSportEquipmentDto): Promise<SportEquipment> {
    return this.sportEquipmentService.create(createSportEquipmentDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSportEquipmentDto: UpdateSportEquipmentDto
  ): Promise<SportEquipment> {
    return this.sportEquipmentService.update(id, updateSportEquipmentDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.sportEquipmentService.delete(id);
  }
}
