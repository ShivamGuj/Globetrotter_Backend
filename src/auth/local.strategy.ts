import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('LocalStrategy');
  
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      this.logger.log(`Attempting to validate user credentials for: ${username}`);
      const user = await this.authService.validateUser(username, password);
      
      if (!user) {
        this.logger.warn(`Invalid credentials for user: ${username}`);
        throw new UnauthorizedException('Invalid username or password');
      }
      
      return user;
    } catch (error) {
      this.logger.error(`Error in validate: ${error.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
