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

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')

export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    register(
        @Body() dto: RegisterDto,
    ) {
        return this.authService.register(
            dto.email,
            dto.password,
        );
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(
            dto.email,
            dto.password,
        );
    }
    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    perfil(@Req() req: any) {
        return req.user;
    }
}