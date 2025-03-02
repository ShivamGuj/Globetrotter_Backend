import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
        };
    }>;
    register(username: string, password: string): Promise<{
        id: string;
        username: string;
        email: string;
        highScore: number;
        createdAt: Date;
    }>;
}
