import { Injectable } from '@nestjs/common';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';
import { PrismaConfigService } from '../../config/prisma.config.service';
import { RentalStatus } from 'PrismaGen/client';
import { Reservation } from 'PrismaGen/client';

@Injectable()
export class GymReservationService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async create(createReservationDto: CreateGymReservationDto): Promise<Reservation> {
    return this.prisma.reservation.create({
      data: {
        userId: createReservationDto.userId,
        startTime: createReservationDto.startTime,
        endTime: createReservationDto.endTime,
        status: RentalStatus.SUBMITTED,
      },
    });
  }

  async findById(id: string): Promise<Reservation> {
    return this.prisma.reservation.findFirst({ where: { id: id } });
  }

  async findAllByUserId(userId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { userId: userId } });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findAllByDate(startTime: Date, endTime: Date): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { startTime: { gte: startTime, lte: endTime } } });
  }

  async update(id: string, updateReservationDto: UpdateGymReservationDto): Promise<Reservation> {
    return this.prisma.reservation.update({ where: { id }, data: updateReservationDto });
  }

  async delete(id: string): Promise<void> {
    this.prisma.reservation.delete({ where: { id } });
  }
}
