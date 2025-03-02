import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findOne(username: string): Promise<{
        id: string;
        username: string;
        email: string;
        highScore: number;
        createdAt: Date;
    }>;
    getProfile(username: string): Promise<import("./user.entity").User>;
}
