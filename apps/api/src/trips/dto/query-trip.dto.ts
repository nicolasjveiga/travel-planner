import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

import { Transform, Type } from 'class-transformer';

export class QueryTripDto {
    @ApiPropertyOptional({
        example: 'Rio de Janeiro',
        description: 'Filtro por destino da viagem',
    })
    @IsOptional()
    @IsString({
        message: 'O filtro deve ser uma string válida.',
    })
    @Transform(({ value }) => value?.trim())
    destination?: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Número da página de resultados',
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'A página deve ser um número inteiro.' })
    @Min(1, { message: 'A página mínima é 1.' })
    page?: number = 1;
}