import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        email: string;
        id: number;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    perfil(req: any): any;
}
