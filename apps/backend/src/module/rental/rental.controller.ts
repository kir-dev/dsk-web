import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.rentalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.rentalService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<object> {
    return this.rentalService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.rentalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.rentalService.delete(id);
  }
}
