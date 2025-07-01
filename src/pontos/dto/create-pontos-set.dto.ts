import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreatePontoDto } from './create-ponto.dto';

export class CreatePontosSetDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePontoDto)
  pontos: CreatePontoDto[];
}