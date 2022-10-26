import { CreateUserDto } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('register user')
  async registerUser(
    @Payload('user')
    user: CreateUserDto
  ) {
    return await this.usersService.registerUser(user);
  }
}
