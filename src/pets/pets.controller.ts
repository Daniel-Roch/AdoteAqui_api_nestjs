import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetsDTO } from './dto/create-pets-dto';
import { UpdatePutPetsDTO } from './dto/update-put-pets-dto';
import { UpdatePatchPetsDTO } from './dto/update-patch-pets-dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async getAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.findOne(id);
  }

  @Get(':id/:name')
  async getTwo(@Param('id', ParseIntPipe) id, @Param('name') name) {
    return `Id é ${id} e o nome: ${name}`;
  }

  //@HttpCode(204) - Controlar https
  @Post()
  async create(@Body() body: CreatePetsDTO) {
    return this.petsService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePatchPetsDTO,
  ) {
    return this.petsService.updateOne(id, body);
  }

  @Put(':id')
  async updateAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePutPetsDTO,
  ) {
    return this.petsService.update(id, body);
  }

  //o HttpStatus.NO_CONTENT é apenas uma conveção onde em vez de colocar 204 ele vai colocar o 204 pra mim
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.remove(id);
  }
}
