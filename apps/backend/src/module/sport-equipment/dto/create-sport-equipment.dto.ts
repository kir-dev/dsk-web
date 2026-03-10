import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSportEquipmentDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  sportId: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  imageUrl: string;
}
