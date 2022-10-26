import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const config = app.get<ConfigService>(ConfigService);
  const host = config.get<string>('host');
  const port = config.get<number>('port');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: host,
      port: port
    }
  });
  await app.startAllMicroservices();
}
bootstrap();
