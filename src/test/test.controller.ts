import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Post()
  async create(
    @Body() body: { name: string; description?: string },
  ): Promise<Test> {
    return this.testService.create(body.name, body.description);
  }
}
