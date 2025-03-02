export declare class AuthService {
    login(username: string): Promise<{
        username: string;
        token: string;
    }>;
}
