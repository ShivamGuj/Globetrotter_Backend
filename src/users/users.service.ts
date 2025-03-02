import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ 
      where: { username }
    });
    
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    
    const user = this.usersRepository.create({ username });
    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async updateScore(userId: number, isCorrect: boolean): Promise<User> {
    const user = await this.findOne(userId);
    
    if (isCorrect) {
      user.correct_answers += 1;
    } else {
      user.incorrect_answers += 1;
    }
    
    return this.usersRepository.save(user);
  }
}
