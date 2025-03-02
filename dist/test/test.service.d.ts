import { Repository } from 'typeorm';
import { Test } from './test.entity';
export declare class TestService {
    private testRepository;
    constructor(testRepository: Repository<Test>);
    findAll(): Promise<Test[]>;
    create(name: string, description?: string): Promise<Test>;
}
