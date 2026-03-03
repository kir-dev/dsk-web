import { Injectable } from '@nestjs/common';
import { CreateGymReservationDto } from './dto/create-gym-reservation.dto';
import { UpdateGymReservationDto } from './dto/update-gym-reservation.dto';
import { PrismaConfigService } from '../../config/config/prisma.config.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from 'PrismaGen/client';

@Injectable()
export class GymReservationService {
  constructor(
    private readonly prisma: PrismaConfigService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async create(createReservationDto: CreateGymReservationDto): Promise<GymReservation> {
    this.prisma.gymReservation.create(createReservationDto);
  }

  async findById(id: string): Promise<> {
    return this.prisma.rental.findFirst(id);
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
