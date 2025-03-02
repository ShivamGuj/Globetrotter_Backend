import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async findAll(): Promise<Test[]> {
    return this.testRepository.find();
  }

  async create(name: string, description?: string): Promise<Test> {
    const test = this.testRepository.create({ name, description });
    return this.testRepository.save(test);
  }
}
