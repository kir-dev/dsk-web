import { PartialType } from '@nestjs/swagger';
import { CreateSportEquipmentDto } from './create-sport-equipment.dto';

export class UpdateSportEquipmentDto extends PartialType(CreateSportEquipmentDto) {}
