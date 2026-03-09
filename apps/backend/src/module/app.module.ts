import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { PrismaConfigService } from '../config/prisma.config.service';
import { GymReservationModule } from './gym-reservation/gym-reservation.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { SportEquipmentModule } from './sport-equipment/sport-equipment.module';
import { RentalModule } from './rental/rental.module';
import { RentalEquipmentModule } from './rental-equipment/rental-equipment.module';
import { ReservationModule } from './reservation/reservation.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    GymReservationModule,
    NewsModule,
    RentalModule,
    RentalEquipmentModule,
    SportEquipmentModule,
    ReservationModule,
    UserModule,
    RouterModule.register([
      { path: 'gym-reservation', module: GymReservationModule },
      { path: 'news', module: NewsModule },
      { path: 'rentals', module: RentalModule },
      { path: 'rental-equipment', module: RentalEquipmentModule },
      { path: 'sport-equipment', module: SportEquipmentModule },
      { path: 'reservations', module: ReservationModule },
      { path: 'app', module: AppModule },
      { path: 'users', module: UserModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaConfigService],
  exports: [PrismaConfigService],
})
export class AppModule {}
