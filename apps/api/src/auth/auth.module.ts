import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminController } from './admin.controller';

import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  controllers: [
    AuthController,
    AdminController,
  ],

  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule { }