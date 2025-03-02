import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('username') username: string): Promise<User> {
    return this.usersService.create(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  @Put(':id/score')
  updateScore(
    @Param('id') id: string,
    @Body('isCorrect') isCorrect: boolean,
  ): Promise<User> {
    return this.usersService.updateScore(+id, isCorrect);
  }
}
