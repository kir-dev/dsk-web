import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.reservationService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<object> {
    return this.reservationService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.reservationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.reservationService.delete(id);
  }
}
