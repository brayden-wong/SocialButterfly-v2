import { CreateUserDto, HelperService, UpdateUserDto, UsersDatabaseService } from '@app/common';
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersDatabaseService)
    private readonly prisma: UsersDatabaseService,
    @Inject(HelperService)
    private readonly helperService: HelperService,
  ) { }

  async registerUser(user: CreateUserDto) {
    user.email = this.helperService.capitalizeLetter(user.email);
    console.log(user.email);
    user.password = await this.helperService.hash(user.password);
    const newUser = await this.prisma.user.create({
      data: user
    });

    return newUser;
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id: id }});
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.prisma.user.update({ 
      where: { id: id },
      data: user
    });
  }

  async removeUser(id: string) {
    return await this.prisma.user.delete({ where: { id: id }});
  }

  async refreshToken(id: string, rt: string) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        refresh_token: await this.helperService.hash(rt, 10)
      }
    });
  }

  async getToken(id: string, token: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user)
      throw new ForbiddenException('Access Denied');

    if (await this.helperService.compare(token, user.refresh_token))
      return true;
    throw new ForbiddenException('Access Denied');
  }

  async updateToken(id: string, token: string) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        refresh_token: await this.helperService.hash(token, 10)
      }
    });
  }

  async validateCredentials(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              mode: 'insensitive',
              contains: username
            }
          }, {
            secondary_email: {
              mode: 'insensitive',
              contains: username
            }
          }
        ]
      }, select: {
        id: true,
        password: true
      }
    })
  }

  async logout(id: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        refresh_token: null
      }
    });
  }
}
