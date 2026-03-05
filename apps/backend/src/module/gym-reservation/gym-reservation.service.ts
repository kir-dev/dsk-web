import { Injectable } from '@nestjs/common';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';
import { PrismaConfigService } from '../../config/config/prisma.config.service';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { RentalStatus } from 'PrismaGen/client';

@Injectable()
export class GymReservationService {
  constructor(
    private readonly prisma: PrismaConfigService
    // private readonly jwtService: JwtService,
    // private readonly config: ConfigService
  ) {}

  async create(createReservationDto: CreateGymReservationDto): Promise<object> {
    return this.prisma.reservation.create({
      data: {
        userId: createReservationDto.userId,
        startTime: createReservationDto.startTime,
        endTime: createReservationDto.endTime,
        status: RentalStatus.SUBMITTED,
      },
    });
  }

  async findById(id: string): Promise<object> {
    return this.prisma.reservation.findFirst({ where: { id: id } });
  }

  async findAllByUserId(userId: string): Promise<object[]> {
    return this.prisma.reservation.findMany({ where: { userId: userId } });
  }

  async findAll(): Promise<object[]> {
    return this.prisma.reservation.findMany();
  }

  async findAllByDate(startTime: Date, endTime: Date): Promise<object[]> {
    return this.prisma.reservation.findMany({ where: { startTime: { gte: startTime, lte: endTime } } });
  }

  async update(id: string, updateReservationDto: UpdateGymReservationDto): Promise<object> {
    return this.prisma.reservation.update({ where: { id }, data: updateReservationDto });
  }

  async delete(id: string): Promise<void> {
    this.prisma.reservation.delete({ where: { id } });
  }
}
