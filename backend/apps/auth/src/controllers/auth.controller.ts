import { Controller, Post, UseGuards, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { GetUserId } from '../decorators/user-id.decorator';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from '../guards/local.guard';
import { RtGuard } from '../guards/rt.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUserId() id: string) {
    return await this.authService.login(id);
  }

  @Public()
  @Post('verify/:id')
  async verifyAccount(
    @Param('id')
    id: string,
    @Res() res: Response
  ) {
    if(await this.authService.verifyAccount(id))
      return res.json(true);
    return res.json(false);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshToken(@User() user: any) {
    return this.authService.updateToken(user['sub'], user['token']);
  }

  
  @Post('logout')
  async logout(@GetUserId() id: string) {
    return await this.authService.logout(id);
  }
}
