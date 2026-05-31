import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
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
