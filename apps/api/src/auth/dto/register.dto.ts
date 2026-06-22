import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'joao@email.com',
        description: 'Email para cadastro do novo usuário',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'senhaSegura123',
        description: 'Senha para o novo usuário (mínimo 6 caracteres)',
    })
    @IsString()
    @MinLength(6)
    password: string;
}