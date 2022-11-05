import { EmailModule, HelperModule, PrismaModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/users/.env'
    }),
    EmailModule,
    PrismaModule,
    HelperModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
