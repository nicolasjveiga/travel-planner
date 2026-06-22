import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'nicolas@email.com',
        description: 'Email do usuário',
    })
    @IsEmail(
        {},
        {
            message: 'Email inválido.',
        },
    )
    email: string;

    @ApiProperty({
        example: 'mypassword123',
        description: 'Senha do usuário (mínimo 6 caracteres)',
    })
    @IsString()
    @MinLength(6, {
        message:
            'A senha deve ter no mínimo 6 caracteres.',
    })
    password: string;
}