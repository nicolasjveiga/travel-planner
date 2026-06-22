import {
    UseGuards,
    Get,
    Req,
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Registra um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados de requisição inválidos' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado' })
    @Post('register')
    register(
        @Body() dto: RegisterDto,
    ) {
        return this.authService.register(
            dto.email,
            dto.password,
        );
    }

    @ApiOperation({ summary: 'Realiza login com email e senha' })
    @ApiBody({
        type: LoginDto,
        examples: {
            sucesso: {
                summary: 'Exemplo de payload válido',
                value: { email: 'joao@email.com', password: 'senhaSegura123' },
            },
            erro_email: {
                summary: 'Exemplo de payload com email inválido',
                value: { email: 'joao_sem_arroba', password: '123' },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Login com sucesso e retorno do token JWT' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(
            dto.email,
            dto.password,
        );
    }

    @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Perfil retornado com sucesso' })
    @ApiResponse({ status: 401, description: 'Não autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    perfil(@Req() req: any) {
        return req.user;
    }
}