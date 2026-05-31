import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user =
            await this.prisma.user.findUnique({
                where: { id },
            });

        if (!user) {
            throw new NotFoundException(
                `User with ID ${id} not found`,
            );
        }

        return user;
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.user.delete({
            where: { id },
        });
    }
}