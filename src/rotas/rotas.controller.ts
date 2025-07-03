import { Controller, Get, Param, NotFoundException, Delete, HttpCode} from '@nestjs/common';
import { RotasService } from './rotas.service';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '../security/auth/auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('rotas')
export class RotasController {
    constructor(private readonly rotasService: RotasService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get('historico')
  findAllHistory() {
    return this.rotasService.findAllHistory();
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get(':id')
  async processarERetornarRota(@Param('id') id: string) {
    return this.rotasService.processarERetornarRota(id);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
    async remove(@Param('id') id: string) {
        await this.rotasService.remove(id);
    }
}
