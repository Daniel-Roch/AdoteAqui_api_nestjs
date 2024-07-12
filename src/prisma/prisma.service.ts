import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1);
    }
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on(`beforeExit`, async () => {
      await app.close();
      process.exit(0);
    });
  }
}
