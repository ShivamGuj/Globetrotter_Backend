import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    // Check if username already exists
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async updateHighScore(username: string, score: number): Promise<void> {
    const user = await this.findByUsername(username);
    if (user && (!user.highScore || score > user.highScore)) {
      user.highScore = score;
      await this.userRepository.save(user);
    }
  }
}
