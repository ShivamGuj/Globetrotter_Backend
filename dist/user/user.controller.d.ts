import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: {
        username: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    getProfile(req: any): any;
    findOne(username: string): Promise<import("./user.entity").User>;
    updateScore(username: string, body: {
        score: number;
    }): Promise<{
        success: boolean;
    }>;
}
