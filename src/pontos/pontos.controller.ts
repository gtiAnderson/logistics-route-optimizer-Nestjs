import { Controller, Post, Body, Get, Param, NotFoundException, Patch, UseGuards } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { CreatePontosSetDto } from './dto/create-pontos-set.dto';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '../security/auth/auth.guard';

@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() body: CreatePontosSetDto) {
    return this.pontosService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id')id: string) {
    const pontosSet = await this.pontosService.findOne(id);
    if (!pontosSet) {
      throw new NotFoundException('Conjunto de pontos não encontrado');
    }
    return pontosSet;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() body: CreatePontosSetDto) {
      const updated = await this.pontosService.update(id, body);
      if (!updated) {
       throw new NotFoundException('Conjunto de pontos não encontrado');
      }
    return updated;
}
}
