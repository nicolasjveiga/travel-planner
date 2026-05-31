import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        email: string;
        password: string;
        id: number;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        password: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        email: string;
        password: string;
        id: number;
    }>;
}
