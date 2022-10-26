import { CreateUserDto, HelperService, UsersDatabaseService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';

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
}
