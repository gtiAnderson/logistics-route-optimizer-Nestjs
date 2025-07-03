import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PontosSet, PontosSetDocument } from 'src/schemas/pontos-set.schema';
import { Model } from 'mongoose';
import { Rota, RotaDocument } from 'src/schemas/rota.schema';
import { Ponto } from 'src/rotas/interface/ponto.interface';

@Injectable()
export class RotasService {
  constructor(
    @InjectModel(PontosSet.name) private pontosSetModel: Model<PontosSetDocument>,
    @InjectModel(Rota.name) private rotaModel: Model<RotaDocument>,
  ) {}

  private calcularDistancia(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private calcularRotaOtimizada(pontos: Ponto[]): { rota: Ponto[], distancia: number } {
    // se não houver pontos, retorne uma rota vazia.
    if (pontos.length === 0) {
      return { rota: [], distancia: 0 };
    }

    // primeiro ponto da lista.
    const pontosNaoVisitados = new Set(pontos.slice(1));
    const rota = [pontos[0]]; 
    let pontoAtual = pontos[0];
    let distanciaTotal = 0;

    // continua ate que todos os pontos tenham sido visitados.
    while (pontosNaoVisitados.size > 0) {
      let pontoMaisProximo: Ponto | null = null;
      let menorDistancia = Infinity;

      // procura o ponto mais próximo entre os não visitados.
      for (const ponto of pontosNaoVisitados) {
        const dist = this.calcularDistancia(pontoAtual, ponto);
        if (dist < menorDistancia) {
          menorDistancia = dist;
          pontoMaisProximo = ponto;
        }
      }

      // adiciona o ponto mais próximo à rota.
      if (pontoMaisProximo) {
        distanciaTotal += menorDistancia;
        pontoAtual = pontoMaisProximo;
        rota.push(pontoAtual);
        pontosNaoVisitados.delete(pontoAtual);
      } else {
        break;
      }
    }

    return { rota, distancia: parseFloat(distanciaTotal.toFixed(2)) };
  }

  async processarERetornarRota(id: string) {

    // busca os Pontos
    const pontosSet = await this.pontosSetModel.findById(id).exec();
    if (!pontosSet) {
      throw new NotFoundException('Conjunto de pontos não encontrado');
    }
    // calcula a Rota
    const pontos: Ponto[] = pontosSet.pontos;
    const resultado = this.calcularRotaOtimizada(pontos);

    // persisti o Resultado
    const rotaCalculada = new this.rotaModel({
      pontoInicialId: pontos[0]?.id,
      ordemRota: resultado.rota.map(p => p.id),
      distanciaTotal: resultado.distancia,
      dataCriacao: new Date(),
    });
    await rotaCalculada.save();

    return {
      rota: resultado.rota,
      distanciaTotal: resultado.distancia,
      rotaId: rotaCalculada._id,
    };
  }

   async findAllHistory() {
    return this.rotaModel.find().sort({ dataCriacao: -1}).exec();  
   }

   async remove(id: string) {
     const deletedRota = await this.rotaModel.findByIdAndDelete(id).exec();
     if (!deletedRota) {
       throw new NotFoundException('Rota não encontrada');
     }
    }

}
