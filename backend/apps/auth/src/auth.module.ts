import { EVENTS_SERVICE, USERS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env'
    }),
    ClientsModule.registerAsync([
      {
        name: USERS_SERVICE,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('users_host'),
            port: config.get<number>('users_port')
          }
        }),
        inject: [ConfigService]
      },
      {
        name: EVENTS_SERVICE,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('events_host'),
            port: config.get<number>('events_port')
          }
        }),
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [
    AuthController,
    UsersController,
  ],
  providers: [
    AuthService,
    UsersService
  ],
})
export class AuthModule {}
