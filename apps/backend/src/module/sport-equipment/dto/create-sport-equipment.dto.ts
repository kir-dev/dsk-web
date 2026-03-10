import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Min } from 'class-validator';

export class CreateSportEquipmentDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID('4')
  sportId: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  imageUrl?: string;
}
