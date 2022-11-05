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

  @MessagePattern('refresh token')
  async refreshToken(
    @Payload('id')
    id: string,
    @Payload('refresh_token')
    rt: string
  ) {
    return await this.usersService.refreshToken(id, rt);
  }

  @MessagePattern('update token')
  async updateToken(
    @Payload('id')
    id: string,
    @Payload('refresh_token') 
    token: string) {
    return await this.usersService.updateToken(id, token);
  }

  @MessagePattern('validate credentials')
  async validateCredentials(
    @Payload('username')
    username: string
  ) {
    return await this.usersService.validateCredentials(username);
  }
  
  @MessagePattern('get token')
  async getToken(
    @Payload('id')
    id: string,
    @Payload('refresh_token')
    rt: string
  ) {
    return await this.usersService.getToken(id, rt);
  }

  @MessagePattern('verify account')
  async verifyAccount(@Payload('id') id: string) {
    return await this.usersService.verifyAccount(id);
  }

  @MessagePattern('log out')
  async logout(@Payload('id') id: string) {
    await this.usersService.logout(id);
  }
}
