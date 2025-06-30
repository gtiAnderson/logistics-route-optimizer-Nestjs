import { Test, TestingModule } from '@nestjs/testing';
import { PontosService } from './pontos.service';

describe('PontosService', () => {
  let service: PontosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PontosService],
    }).compile();

    service = module.get<PontosService>(PontosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
