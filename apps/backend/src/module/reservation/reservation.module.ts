import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaConfigService],
})
export class ReservationModule {}
