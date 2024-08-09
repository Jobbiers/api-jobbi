import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    subCategory?: Category[];
}

export interface Category {
    name: string;
    subCategory?: Category[];
  }