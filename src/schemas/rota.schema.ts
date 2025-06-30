import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RotaDocument = Rota & Document;

@Schema()
export class Rota {
  @Prop({ type: Number, required: true })
  pontoInicialId: number;

  @Prop({ type: [Number], required: true })
  ordemRota: number[];

  @Prop({ type: Number, required: true })
  distanciaTotal: number;

  @Prop({ type: Date, default: Date.now })
  dataCriacao: Date;
}

export const RotaSchema = SchemaFactory.createForClass(Rota);