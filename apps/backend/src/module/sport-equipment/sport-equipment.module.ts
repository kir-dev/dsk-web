import { Module } from '@nestjs/common';
import { SportEquipmentController } from './sport-equipment.controller';
import { SportEquipmentService } from './sport-equipment.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [SportEquipmentController],
  providers: [SportEquipmentService, PrismaConfigService],
})
export class SportEquipmentModule {}
