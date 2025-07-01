import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePontosSetDto } from './dto/create-pontos-set.dto';
import { PontosSet, PontosSetDocument } from '../schemas/pontos-set.schema';

@Injectable()
export class PontosService {
  constructor(
    @InjectModel(PontosSet.name) private pontosSetModel: Model<PontosSetDocument>,
  ) {}

  async create(dto: CreatePontosSetDto) {
    const created = new this.pontosSetModel(dto);
    const saved = await created.save();
    return { id: saved._id };
  }

  async findOne(id: string) {
    const pontosSet = await this.pontosSetModel.findById(id).exec();
    if (!pontosSet) {
    }
    return pontosSet;
  }

  async update(id: string, dto: CreatePontosSetDto) {
  const pontosSet = await this.pontosSetModel.findById(id).exec();
  if (!pontosSet) {
    throw new NotFoundException('Conjunto de pontos não encontrado');
  }

  // Crie um mapa para acesso rápido aos pontos existentes pelo id
  const pontosMap = new Map<number, any>();
  pontosSet.pontos.forEach((p: any) => pontosMap.set(p.id, p));

  // Atualize ou adicione pontos
  dto.pontos.forEach((novoPonto) => {
    if (pontosMap.has(novoPonto.id)) {
      // Atualiza x e y do ponto existente
      const pontoExistente = pontosMap.get(novoPonto.id);
      pontoExistente.x = novoPonto.x;
      pontoExistente.y = novoPonto.y;
    } else {
      // Adiciona novo ponto
      pontosSet.pontos.push(novoPonto);
    }
  });

  await pontosSet.save();
  return pontosSet;  
}
}
