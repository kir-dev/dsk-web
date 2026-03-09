import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [RentalController],
  providers: [RentalService, PrismaConfigService],
})
export class RentalModule {}
