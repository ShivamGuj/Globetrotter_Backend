import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(username: string): Promise<User>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    updateScore(id: string, isCorrect: boolean): Promise<User>;
}
