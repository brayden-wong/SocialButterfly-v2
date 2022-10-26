import { CreateUserDto, UpdateUserDto } from '@app/common';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { GetUserId } from '../decorators/user-id.decorator';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersSerivce: UsersService
  ) { }

  @Public()
  @Post('register')
  async registerUser(
    @Body('user')
    user: CreateUserDto
  ) {
    return await this.usersSerivce.registerUser(user);
  }

  @Public()
  @Get()
  async findAllUsers() {
    return await this.usersSerivce.findAllUsers();
  }
  
  @Get('')
  async findUserById(
    @GetUserId()
    id: string
  ) {
    return await this.usersSerivce.findUserById(id);
  }

  @Patch()
  async updateUser(
    @GetUserId()
    id: string,
    @Body('user')
    user: UpdateUserDto
  ) {
    return await this.usersSerivce.updateUser(id, user);
  }

  @Delete()
  async removeUser(
    @GetUserId()
    id: string
  ) {
    return await this.usersSerivce.removeUser(id);
  }
}