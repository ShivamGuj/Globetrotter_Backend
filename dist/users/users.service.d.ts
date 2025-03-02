import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(username: string): Promise<User>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    updateScore(userId: number, isCorrect: boolean): Promise<User>;
}
