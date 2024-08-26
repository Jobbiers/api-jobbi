import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export interface Category {
    id: number;
    name: string;
    subCategory?: Category[];
}

export class FavCategoriesDto {
    @IsArray()
    categoriesId: number[];

    @IsString()
    userId: string;

    @IsString()
    userName: string;

    @IsString()
    creationDate: string;

    @IsString()
    lastUpdate: string;
}