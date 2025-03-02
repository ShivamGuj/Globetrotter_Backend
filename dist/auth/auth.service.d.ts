import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private logger;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        userId: any;
        username: any;
    }>;
    register(username: string, password: string): Promise<{
        id: string;
        username: string;
        highScore: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
