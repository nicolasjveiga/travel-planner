import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
