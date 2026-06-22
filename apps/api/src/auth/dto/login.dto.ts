import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
} from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'joao@email.com',
        description: 'Email do usuário cadastrado',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'senhaSegura123',
        description: 'Senha em formato texto plano',
    })
    @IsString()
    password: string;
}