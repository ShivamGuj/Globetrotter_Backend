import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findOne(username: string): Promise<{
        id: number;
        username: string;
        highScore: number;
    }>;
    getProfile(username: string): Promise<import("./user.entity").User>;
}
