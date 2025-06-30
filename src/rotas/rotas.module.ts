import { Module } from '@nestjs/common';
import { RotasController } from './rotas.controller';
import { RotasService } from './rotas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RotaSchema, Rota } from 'src/schemas/rota.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rota.name, schema: RotaSchema}
    ]),
  ],
  controllers: [RotasController],
  providers: [RotasService]
})
export class RotasModule {}
