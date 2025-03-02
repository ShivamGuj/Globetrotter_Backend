import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      this.logger.log(`Attempting to validate user: ${username}`);
      const user = await this.userService.findByUsername(username);
      
      if (!user) {
        this.logger.warn(`User not found: ${username}`);
        return null;
      }
      
      if (!user.password) {
        this.logger.warn(`User ${username} has no password set`);
        return null;
      }

      try {
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
          this.logger.log(`User ${username} successfully validated`);
          const { password, ...result } = user;
          return result;
        } else {
          this.logger.warn(`Password mismatch for user: ${username}`);
          return null;
        }
      } catch (bcryptError) {
        this.logger.error(`bcrypt error: ${bcryptError.message}`);
        // If bcrypt throws an error (could happen with invalid hash format)
        return null;
      }
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`);
      return null; // Don't throw, return null to indicate validation failed
    }
  }

  async login(user: any) {
    try {
      const payload = { 
        username: user.username, 
        sub: user.id 
      };
      
      const token = this.jwtService.sign(payload);
      this.logger.log(`Generated token for user: ${user.username}`);
      
      return {
        access_token: token,
        userId: user.id,
        username: user.username,
      };
    } catch (error) {
      this.logger.error(`Error in login: ${error.message}`);
      throw new UnauthorizedException('Login failed');
    }
  }

  async register(username: string, password: string) {
    try {
      const newUser = await this.userService.create(username, password);
      const { password: _, ...result } = newUser;
      return result;
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }
}
