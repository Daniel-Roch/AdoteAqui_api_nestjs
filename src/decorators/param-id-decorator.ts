import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//Criação de decorators para criar facilidades na hora de passar.
//O data não está vindo nenhuma data, então não preciso, coloco _
//Eu sei que o params id vem como string, converti para number.
//farei ParamId() id, assim é mais fácil do que o existente: @Param('id', ParseIntPipe)
export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id);
  },
);

//Antes era assim.
/* @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.findOne(id);
  } */

//Agora:
/* @Get(':id')
  async getOne(@ParamId('id', ParseIntPipe) id: number) {
    return this.petsService.findOne(id);
} */
