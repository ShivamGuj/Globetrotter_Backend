import { TestService } from './test.service';
import { Test } from './test.entity';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    findAll(): Promise<Test[]>;
    create(body: {
        name: string;
        description?: string;
    }): Promise<Test>;
}
