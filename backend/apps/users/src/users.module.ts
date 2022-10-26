import { HelperModule, UsersDatabaseModule } from '@app/common';
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
    UsersDatabaseModule,
    HelperModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
