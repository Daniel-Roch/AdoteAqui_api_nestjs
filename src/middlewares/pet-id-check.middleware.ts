import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Middleware é executado durante o processo de chamada do http
//Utilizei ele para verificar qual número passo como id
//Se ele for 0 ou -1, ele irá parar a execução antes mesmo de chamar
//Evitando executar desnecessariamente a busca por um id que sei que é inválido
export class PetIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0)
      throw new BadRequestException('ID inválido!');
    next();
  }
}
