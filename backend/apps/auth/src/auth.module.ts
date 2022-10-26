import { EVENTS_SERVICE, HelperModule, USERS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { AtGuard } from './guards/at.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RtGuard } from './guards/rt.guard';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AtStrategy } from './strategies/at.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';

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
    HelperModule,
    JwtModule.register({}),
    PassportModule

  ],
  controllers: [
    AuthController,
    UsersController,
    EventsController,
  ],
  providers: [
    AuthService,
    UsersService,
    EventsService,
    LocalStrategy,
    LocalAuthGuard,
    AtStrategy,
    AtGuard,
    RtStrategy,
    RtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AuthModule { }