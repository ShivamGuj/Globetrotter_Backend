import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    private logger;
    constructor(userRepository: Repository<User>);
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(username: string, password: string): Promise<User>;
    updateHighScore(username: string, score: number): Promise<void>;
    getTopScores(limit?: number): Promise<User[]>;
}
