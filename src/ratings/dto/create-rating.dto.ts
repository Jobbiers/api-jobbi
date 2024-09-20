import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsNotEmpty()
  comment?: string;

  // @IsNotEmpty()
  // @IsOptional()
  // businessId: number;

  @IsNotEmpty()
  serviceId: number;
}