import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
