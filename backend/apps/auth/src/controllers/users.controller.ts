import { CreateUserDto, UpdateUserDto } from '@app/common';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersSerivce: UsersService
  ) { }

  @Post('register')
  async registerUser(
    @Body('user')
    user: CreateUserDto
  ) {
    return await this.usersSerivce.registerUser(user);
  }

  @Get()
  async findAllUsers() {
    return await this.usersSerivce.findAllUsers();
  }
  
  @Get(':id')
  async findUserById(
    @Param('id')
    id: string
  ) {
    return await this.usersSerivce.findUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body('user')
    user: UpdateUserDto
  ) {
    return await this.usersSerivce.updateUser(id, user);
  }

  @Delete(':id')
  async removeUser(
    @Param('id')
    id: string
  ) {
    return await this.usersSerivce.removeUser(id);
  }
}