import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class SportEquipmentService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.sportEquipment.findMany({
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async findOne(id: string): Promise<object> {
    return this.prisma.sportEquipment.findUnique({
      where: { id },
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async create(data: any): Promise<object> {
    return this.prisma.sportEquipment.create({
      data: {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        imageUrl: data.imageUrl,
        sportId: data.sportId,
      },
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async update(id: string, data: any): Promise<object> {
    return this.prisma.sportEquipment.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        imageUrl: data.imageUrl,
        sportId: data.sportId,
      },
      include: {
        sport: true,
        rentalEquipment: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sportEquipment.delete({
      where: { id },
    });
  }
}
