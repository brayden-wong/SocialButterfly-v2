import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class EventsDatabaseService extends PrismaClient implements OnModuleInit {
  constructor() { super({ log: ['info'] }) }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async() => {
      await app.close();
    });
  }
}