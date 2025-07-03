import { Module } from '@nestjs/common';
import { RotasController } from './rotas.controller';
import { RotasService } from './rotas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rota, RotaSchema } from '../schemas/rota.schema';
import { PontosModule } from '../pontos/pontos.module';

@Module({
  imports: [
    PontosModule,
    MongooseModule.forFeature([
      { name: Rota.name, schema: RotaSchema },
    ]),
  ],
  controllers: [RotasController],
  providers: [RotasService],
})
export class RotasModule {}