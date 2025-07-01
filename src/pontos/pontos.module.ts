import { Module } from '@nestjs/common';
import { PontosController } from './pontos.controller';
import { PontosService } from './pontos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosSet, PontosSetSchema } from '../schemas/pontos-set.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontosSet.name, schema: PontosSetSchema },
    ]),
  ],
  controllers: [PontosController],
  providers: [PontosService]
})
export class PontosModule {}
