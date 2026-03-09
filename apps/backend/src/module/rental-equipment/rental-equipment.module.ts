import { Module } from '@nestjs/common';
import { RentalEquipmentController } from './rental-equipment.controller';
import { RentalEquipmentService } from './rental-equipment.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [RentalEquipmentController],
  providers: [RentalEquipmentService, PrismaConfigService],
})
export class RentalEquipmentModule {}
