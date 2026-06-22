import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados de requisição inválidos' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado' })
    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.usersService.create(
            createUserDto,
        );
    }

    @ApiOperation({ summary: 'Lista todos os usuários cadastrados' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.usersService.findOne(id);
    }

    @ApiOperation({ summary: 'Remove um usuário pelo ID' })
    @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.usersService.remove(id);
    }
}