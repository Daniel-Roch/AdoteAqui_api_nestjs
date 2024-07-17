import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PetIdCheckMiddleware } from 'src/middlewares/pet-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
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
