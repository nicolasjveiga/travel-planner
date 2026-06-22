import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { RolesGuard } from '../auth/roles.guard';

import { Roles } from '../auth/roles.decorator';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(
    JwtAuthGuard,
    RolesGuard,
)
export class AdminController {

    @ApiOperation({ summary: 'Acessa dados administrativos (requer papel ADMIN)' })
    @ApiResponse({ status: 200, description: 'Dados administrativos acessados com sucesso' })
    @ApiResponse({ status: 401, description: 'Não autorizado' })
    @ApiResponse({ status: 403, description: 'Proibido (requer privilégios de ADMIN)' })
    @Get()
    @Roles('ADMIN')
    getAdminData() {
        return {
            message: 'Bem-vindo, Admin!',
        };
    }
}