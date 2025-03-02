import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private logger;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        userId: any;
        username: any;
    }>;
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        id: string;
        username: string;
        highScore: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): any;
}
