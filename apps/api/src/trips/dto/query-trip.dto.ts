import { IsOptional, IsString, IsInt, Min } from 'class-validator';

import { Transform, Type } from 'class-transformer';

export class QueryTripDto {
    @IsOptional()
    @IsString({
        message: 'O filtro deve ser uma string válida.',
    })
    @Transform(({ value }) => value?.trim())
    destination?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'A página deve ser um número inteiro.' })
    @Min(1, { message: 'A página mínima é 1.' })
    page?: number = 1;
}