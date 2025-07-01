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
    // 1. Caso base: se não houver pontos, retorne uma rota vazia.
    if (pontos.length === 0) {
      return { rota: [], distancia: 0 };
    }

    // 2. Inicialização: Começamos do primeiro ponto da lista.
    const pontosNaoVisitados = new Set(pontos.slice(1));
    const rota = [pontos[0]]; // A rota final conterá os objetos Ponto completos.
    let pontoAtual = pontos[0];
    let distanciaTotal = 0;

    // 3. Loop principal: continue até que todos os pontos tenham sido visitados.
    while (pontosNaoVisitados.size > 0) {
      let pontoMaisProximo: Ponto | null = null;
      let menorDistancia = Infinity;

      // 4. Encontre o ponto mais próximo entre os não visitados.
      for (const ponto of pontosNaoVisitados) {
        const dist = this.calcularDistancia(pontoAtual, ponto);
        if (dist < menorDistancia) {
          menorDistancia = dist;
          pontoMaisProximo = ponto;
        }
      }

      // 5. Adicione o ponto mais próximo à rota.
      if (pontoMaisProximo) {
        distanciaTotal += menorDistancia;
        pontoAtual = pontoMaisProximo;
        rota.push(pontoAtual);
        pontosNaoVisitados.delete(pontoAtual);
      } else {
        // Medida de segurança: se não encontrar um próximo ponto, quebre o loop.
        break;
      }
    }

    // 6. Retorne a rota otimizada e a distância.
    return { rota, distancia: parseFloat(distanciaTotal.toFixed(2)) };
  }

  async processarERetornarRota(id: string) {
    // Passo 1: Buscar os Pontos
    const pontosSet = await this.pontosSetModel.findById(id).exec();
    if (!pontosSet) {
      throw new NotFoundException('Conjunto de pontos não encontrado');
    }
    // Passo 2: Calcular a Rota
    const pontos: Ponto[] = pontosSet.pontos;
    const resultado = this.calcularRotaOtimizada(pontos);

    // Passo 3: Persistir o Resultado
    const rotaCalculada = new this.rotaModel({
      pontoInicialId: pontos[0]?.id,
      ordemRota: resultado.rota.map(p => p.id),
      distanciaTotal: resultado.distancia,
      dataCriacao: new Date(),
    });
    await rotaCalculada.save();

    // Passo 4: Retornar o Resultado
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
