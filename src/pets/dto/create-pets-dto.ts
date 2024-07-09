import { IsNumber, IsString } from 'class-validator';

export class CreatePetsDTO {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  link: string;

  @IsNumber()
  available: number;

  @IsString()
  description: string;

  @IsString()
  location: string;
}
