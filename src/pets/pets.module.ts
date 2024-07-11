import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PetIdCheckMiddleware } from 'src/middlewares/pet-id-check.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [],
})
export class PetsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PetIdCheckMiddleware).forRoutes({
      path: 'pets/:id',
      method: RequestMethod.ALL,
    });
  }
}
