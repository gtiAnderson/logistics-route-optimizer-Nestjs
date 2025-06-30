import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PontoEntregaDocument = PontoEntrega & Document;

@Schema()
export class PontoEntrega {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: Number, required: true })
  x: number;

  @Prop({ type: Number, required: true })
  y: number;
}

export const PontoEntregaSchema = SchemaFactory.createForClass(PontoEntrega);