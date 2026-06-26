import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsInt,
    Min,
    MinLength,
    IsDate,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateTripDto {
    @ApiProperty({
        example: 'Férias de Verão',
        description: 'Título ou nome da viagem',
    })
    @IsString({ message: 'O título deve ser uma string válida.' })
    @MinLength(3, {
        message: 'O título deve possuir no mínimo 3 caracteres.',
    })
    title: string;

    @ApiProperty({
        example: 'Rio de Janeiro',
        description: 'Destino da viagem',
    })
    @IsString({ message: 'O destino deve ser uma string válida.' })
    destination: string;

    @ApiProperty({
        example: '2026-12-20T00:00:00.000Z',
        description: 'Data de início da viagem',
        type: String,
        format: 'date-time',
    })
    @Type(() => Date)
    @IsDate({
        message: 'A data inicial deve possuir formato válido.',
    })
    startDate: Date;

    @ApiProperty({
        example: '2027-01-05T00:00:00.000Z',
        description: 'Data de término da viagem',
        type: String,
        format: 'date-time',
    })
    @Type(() => Date)
    @IsDate({
        message: 'A data final deve possuir formato válido.',
    })
    endDate: Date;
}