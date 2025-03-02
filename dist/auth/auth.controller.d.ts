import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
        };
    }>;
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        id: string;
        username: string;
        email: string;
        highScore: number;
        createdAt: Date;
    }>;
    getProfile(req: any): any;
}
