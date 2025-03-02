import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: { username: string; password: string }) {
    return this.userService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Don't include email since it's not in the entity anymore
    const { password, ...user } = req.user;
    return user;
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Post(':username/score')
  async updateScore(
    @Param('username') username: string,
    @Body() body: { score: number },
  ) {
    await this.userService.updateHighScore(username, body.score);
    return { success: true };
  }
}
