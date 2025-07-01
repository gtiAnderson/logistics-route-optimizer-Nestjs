import { Module } from '@nestjs/common';
import { RotasController } from './rotas.controller';
import { RotasService } from './rotas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosSet, PontosSetSchema } from '../schemas/pontos-set.schema';
import { Rota, RotaSchema } from '../schemas/rota.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontosSet.name, schema: PontosSetSchema },
      { name: Rota.name, schema: RotaSchema },
    ]),
  ],
  controllers: [RotasController],
  providers: [RotasService],
})
export class RotasModule {}