import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateGymReservationDto {
  @IsNotEmpty()
  @IsUUID()
  userId?: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;
}
