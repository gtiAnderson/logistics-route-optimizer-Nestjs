import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PontoEntrega } from './ponto.schema';

export type PontosSetDocument = PontosSet & Document;

@Schema()
export class PontosSet {
  @Prop({ type: [Object], required: true })
  pontos: PontoEntrega[];
}

export const PontosSetSchema = SchemaFactory.createForClass(PontosSet);