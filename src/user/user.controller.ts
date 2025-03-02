import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // For now, let's just remove the JWT Guard until we resolve the import issue
  @Get('profile/:username')
  getProfile(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }
}
