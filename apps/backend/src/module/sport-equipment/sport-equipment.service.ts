import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';
import { CreateSportEquipmentDto } from './dto/create-sport-equipment.dto';
import { UpdateSportEquipmentDto } from './dto/update-sport-equipment.dto';
import { SportEquipment } from '@prisma/client';

@Injectable()
export class SportEquipmentService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<SportEquipment[]> {
    return this.prisma.sportEquipment.findMany({
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async findOne(id: string): Promise<SportEquipment> {
    return this.prisma.sportEquipment.findUnique({
      where: { id: id },
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async create(createSportEquipmentDto: CreateSportEquipmentDto): Promise<SportEquipment> {
    createSportEquipmentDto.imageUrl = createSportEquipmentDto.imageUrl ?? '';

    return this.prisma.sportEquipment.create({
      data: createSportEquipmentDto,
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async update(id: string, updateSportEquipmentDto: UpdateSportEquipmentDto): Promise<SportEquipment> {
    return this.prisma.sportEquipment.update({
      where: { id: id },
      data: updateSportEquipmentDto,
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sportEquipment.delete({
      where: { id: id },
    });
  }
}
