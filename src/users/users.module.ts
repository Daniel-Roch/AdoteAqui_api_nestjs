import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserController } from './uers.controller';
import { UserService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from '../middlewares/user-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

//usei aqui o forwardRef para não gerar loop de dependencia de modules

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
//Fiz essa implementação com middleware para fazer a validação de id(se é number)
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'user/:id',
      method: RequestMethod.ALL,
    });
  }
}
