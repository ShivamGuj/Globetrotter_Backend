import { Controller, Post, UseGuards, Request, Body, Logger, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    try {
      this.logger.log('Login attempt successful, generating token');
      return this.authService.login(req.user);
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`);
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      this.logger.log(`Registration attempt for username: ${body.username}`);
      
      if (!body.username || !body.password) {
        throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
      }
      
      return this.authService.register(body.username, body.password);
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
