import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/events/.env'
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
