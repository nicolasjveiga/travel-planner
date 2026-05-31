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

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.usersService.create(
            createUserDto,
        );
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.usersService.remove(id);
    }
}