import { PartialType } from '@nestjs/swagger';
import { CreateGymReservationDto } from './create-gym-reservation.dto';

export class UpdateGymReservationDto extends PartialType(CreateGymReservationDto) {}
