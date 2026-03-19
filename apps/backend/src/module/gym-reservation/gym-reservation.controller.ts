import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { GymReservationService } from './gym-reservation.service';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';
import { Reservation } from 'PrismaGen/client';

@Controller()
export class GymReservationController {
  constructor(private readonly gymReservationService: GymReservationService) {}

  @Post()
  async create(@Body() createGymReservationDto: CreateGymReservationDto): Promise<Reservation> {
    return this.gymReservationService.create(createGymReservationDto);
  }

  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.gymReservationService.findAll();
  }

  @Get('by-date')
  async findByTime(@Query() startTime: Date, @Query() endTime: Date): Promise<Reservation[]> {
    return this.gymReservationService.findAllByDate(startTime, endTime);
  }

  @Get(':userId')
  async findAllByUserId(@Param('userId', ParseUUIDPipe) userId: string): Promise<Reservation[]> {
    return this.gymReservationService.findAllByUserId(userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGymReservationDto: UpdateGymReservationDto
  ): Promise<Reservation> {
    return this.gymReservationService.update(id, updateGymReservationDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.gymReservationService.delete(id);
  }
}
