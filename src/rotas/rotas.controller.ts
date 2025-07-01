import { Controller, Get, Param, NotFoundException, Delete, HttpCode} from '@nestjs/common';
import { RotasService } from './rotas.service';

@Controller('rota')
export class RotasController {
    constructor(private readonly rotasService: RotasService) {}

  @Get(':id')
  async processarERetornarRota(@Param('id') id: string) {
    return this.rotasService.processarERetornarRota(id);
  }

  @Get('historico')
    async findAllHistory() {
    const history = await this.rotasService.findAllHistory();
    return this.rotasService.findAllHistory();
    }
  @Delete(':id')
  @HttpCode(204)
    async remove(@Param('id') id: string) {
        await this.rotasService.remove(id);
    }
}
