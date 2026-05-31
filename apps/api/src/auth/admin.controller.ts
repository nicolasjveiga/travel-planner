import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { RolesGuard } from '../auth/roles.guard';

import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(
    JwtAuthGuard,
    RolesGuard,
)
export class AdminController {

    @Get()
    @Roles('ADMIN')
    getAdminData() {
        return {
            message: 'Bem-vindo, Admin!',
        };
    }
}