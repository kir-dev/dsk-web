import { Module } from '@nestjs/common';
import { GymReservationController } from './gym-reservation.controller';
import { GymReservationService } from './gym-reservation.service';
import { PrismaConfigService } from '../../config/config/prisma.config.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [GymReservationController],
  providers: [GymReservationService, PrismaConfigService, JwtService, ConfigService],
})
export class GymReservationModule {}
