import { PartialType } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
  
    @IsOptional()
    @IsNotEmpty()
    comment?: string;
}