import {
    IsString,
    IsDateString,
    IsInt,
    Min,
    MinLength,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateTripDto {
    @IsString({ message: 'O título deve ser uma string válida.' })
    @MinLength(3, {
        message: 'O título deve possuir no mínimo 3 caracteres.',
    })
    title: string;

    @IsString({ message: 'O destino deve ser uma string válida.' })
    destination: string;

    @IsDateString(
        {},
        { message: 'A data inicial deve possuir formato válido.' },
    )
    startDate: Date;

    @IsDateString(
        {},
        { message: 'A data final deve possuir formato válido.' },
    )
    endDate: Date;

    @Type(() => Number)
    @IsInt({ message: 'O userId deve ser um número inteiro.' })
    @Min(1, { message: 'O userId deve ser maior que 0.' })
    userId: number;
}