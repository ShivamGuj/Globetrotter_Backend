import { Injectable, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      this.logger.log(`Finding user by username: ${username}`);
      
      // Use TypeORM query instead of raw SQL
      const user = await this.userRepository.findOne({ 
        where: { username } 
      });
      
      if (!user) {
        this.logger.warn(`User not found: ${username}`);
        return undefined;
      }
      
      this.logger.log(`User found: ${username}`);
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by username: ${error.message}`);
      return undefined;
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ 
        where: { id } 
      });
    } catch (error) {
      this.logger.error(`Error finding user by ID: ${error.message}`);
      return undefined;
    }
  }

  async create(username: string, password: string): Promise<User> {
    try {
      this.logger.log(`Creating user: ${username}`);
      
      // Check if username already exists
      const existingUser = await this.findByUsername(username);
      if (existingUser) {
        this.logger.warn(`Username already exists: ${username}`);
        throw new ConflictException('Username already exists');
      }

      // Hash password and create user with TypeORM
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
        highScore: 0
      });
      
      const savedUser = await this.userRepository.save(newUser);
      
      this.logger.log(`User created successfully: ${username}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async updateHighScore(username: string, score: number): Promise<void> {
    try {
      this.logger.log(`Updating high score for ${username}: ${score}`);
      const user = await this.findByUsername(username);
      
      if (!user) {
        this.logger.warn(`User not found for high score update: ${username}`);
        throw new NotFoundException(`User ${username} not found`);
      }
      
      // Only update if the new score is higher
      if (score > user.highScore) {
        user.highScore = score;
        await this.userRepository.save(user);
        this.logger.log(`High score updated for ${username}: ${score}`);
      } else {
        this.logger.log(`Score ${score} not higher than current high score ${user.highScore}`);
      }
    } catch (error) {
      this.logger.error(`Error updating high score: ${error.message}`);
      throw error;
    }
  }
  
  async getTopScores(limit: number = 10): Promise<User[]> {
    try {
      return await this.userRepository.find({
        order: { highScore: 'DESC' },
        take: limit,
        select: ['id', 'username', 'highScore', 'createdAt']
      });
    } catch (error) {
      this.logger.error(`Error getting top scores: ${error.message}`);
      return [];
    }
  }
}
