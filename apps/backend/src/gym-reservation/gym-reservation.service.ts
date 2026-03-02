import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';
import { GymReservation } from '@prisma/client';

@Injectable()
export class GymReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateGymReservationDto): Promise<void> {
    this.prisma.gymReservation.create(createReservationDto);
  }

  async findById(id: string): Promise<GymReservation> {
    return this.prisma.gymReservation.findFirst(id);
  }

  async findAll(): Promise<GymReservation[]> {
    return this.prisma.gymReservation.FindMany();
  }

  async update(id: string, updateReservationDto: UpdateGymReservationDto): Promise<void> {
    this.prisma.gymReservation.update({ where: { id }, data: updateReservationDto });
  }

  async delete(id: string): Promise<void> {
    this.prisma.gymReservation.delete({ where: { id } });
  }
}
