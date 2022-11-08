import { EmailModule, PrismaModule, USERS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/events/.env'
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
      }
    ]),
    PrismaModule,
    EmailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
