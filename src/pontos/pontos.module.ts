import { Module } from '@nestjs/common';
import { PontosController } from './pontos.controller';
import { PontosService } from './pontos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PontoEntrega, PontoEntregaSchema } from '../schemas/ponto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontoEntrega.name, schema: PontoEntregaSchema },
    ]),
  ],
  controllers: [PontosController],
  providers: [PontosService]
})
export class PontosModule {}
