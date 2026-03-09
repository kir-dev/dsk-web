import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GymReservationService } from './gym-reservation.service';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';

@Controller()
export class GymReservationController {
  constructor(private readonly gymReservationService: GymReservationService) {}

  @Post()
  async create(@Body() createGymReservationDto: CreateGymReservationDto): Promise<object> {
    return this.gymReservationService.create(createGymReservationDto);
  }

  @Get()
  async findAll(): Promise<object[]> {
    return this.gymReservationService.findAll();
  }

  @Get('by-date')
  async findByTime(@Query() startTime: Date, @Query() endTime: Date): Promise<object> {
    return this.gymReservationService.findAllByDate(startTime, endTime);
  }

  @Get(':userId')
  async findAllByUserId(@Param('userId') userId: string): Promise<object[]> {
    return this.gymReservationService.findAllByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGymReservationDto: UpdateGymReservationDto): Promise<object> {
    return this.gymReservationService.update(id, updateGymReservationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.gymReservationService.delete(id);
  }
}
