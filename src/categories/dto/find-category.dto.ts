import { IsOptional } from "class-validator";

export class FindCategoryParamsDto {
    @IsOptional()
    limit: number;

    @IsOptional()
    page: number;
}