import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConfigService } from './config/config/prisma.config.service';
import { GymReservationModule } from './module/gym-reservation/gym-reservation.module';

@Module({
  imports: [GymReservationModule],
  controllers: [AppController],
  providers: [AppService, PrismaConfigService],
  exports: [PrismaConfigService],
})
export class AppModule {}
