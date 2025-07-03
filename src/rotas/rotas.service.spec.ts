import { Test, TestingModule } from '@nestjs/testing';
import { RotasService } from './rotas.service';

// Mock do Ponto
type Ponto = { id: number; x: number; y: number };

// Classe extendida para expor o método privado para teste
class RotasServiceTestable extends RotasService {
  public calcularRotaOtimizadaPublic(pontos: Ponto[]) {
    // @ts-ignore
    return this.calcularRotaOtimizada(pontos);
  }
}

describe('RotasService', () => {
  let service: RotasServiceTestable;

  beforeEach(() => {
    // Instancia sem dependências do mongoose para teste puro
    service = new RotasServiceTestable(null as any, null as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar rota e distância corretas para 3 pontos em linha', () => {
    const pontos: Ponto[] = [
      { id: 1, x: 0, y: 0 },
      { id: 2, x: 3, y: 0 },
      { id: 3, x: 6, y: 0 },
    ];
    const resultado = service.calcularRotaOtimizadaPublic(pontos);
    expect(resultado.rota.map(p => p.id)).toEqual([1, 2, 3]);
    expect(resultado.distancia).toBeCloseTo(6.00, 2);
  });

  it('deve retornar rota e distância corretas para 3 pontos em triângulo', () => {
    const pontos: Ponto[] = [
      { id: 1, x: 0, y: 0 },
      { id: 2, x: 0, y: 3 },
      { id: 3, x: 4, y: 0 },
    ];
    const resultado = service.calcularRotaOtimizadaPublic(pontos);
    // Ordem esperada: 1 -> 2  -> 3 
    expect(resultado.rota.map(p => p.id)).toEqual([1, 2, 3]);
    expect(resultado.distancia).toBeCloseTo(8.00, 2);
  });

  it('deve retornar rota vazia e distância zero para lista vazia', () => {
    const pontos: Ponto[] = [];
    const resultado = service.calcularRotaOtimizadaPublic(pontos);
    expect(resultado.rota).toEqual([]);
    expect(resultado.distancia).toBe(0);
  });

  it('deve retornar rota com um ponto e distância zero', () => {
    const pontos: Ponto[] = [{ id: 1, x: 1, y: 1 }];
    const resultado = service.calcularRotaOtimizadaPublic(pontos);
    expect(resultado.rota.map(p => p.id)).toEqual([1]);
    expect(resultado.distancia).toBe(0);
  });
});
