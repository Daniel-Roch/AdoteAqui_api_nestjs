import { CreatePetsDTO } from './create-pets-dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchPetsDTO extends PartialType(CreatePetsDTO) {}
