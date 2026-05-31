import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(
        email: string,
        password: string,
    ) {
        const user =
            await this.prisma.user.findUnique({
                where: { email },
            });

        if (user) {
            throw new ConflictException(
                'Email já cadastrado',
            );
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    async login(
        email: string,
        password: string,
    ) {
        const user =
            await this.prisma.user.findUnique({
                where: { email },
            });

        if (!user) {
            throw new UnauthorizedException(
                'Credenciais inválidas',
            );
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password,
            );

        if (!passwordMatch) {
            throw new UnauthorizedException(
                'Credenciais inválidas',
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token:
                await this.jwtService.signAsync(
                    payload,
                ),
        };
    }
}