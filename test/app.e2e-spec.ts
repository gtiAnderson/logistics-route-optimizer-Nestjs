import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Rotas E2E', () => {
  let app: INestApplication;
  const apiKey = process.env.API_KEY || '123456'; // chave do .env

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Importante para garantir a mesma validação da sua app
    await app.init();
  }, 30000);

  it('deve criar um conjunto de pontos, depois calcular e retornar a rota para ele', async () => {
    let pontoSetId: string;

    // ETAPA 1: Criar um novo conjunto de pontos com POST /pontos
    const createResponse = await request(app.getHttpServer())
      .post('/pontos')
      .set('x-api-key', apiKey) // <-- Autenticação com o Guard que você criou
      .send({
        pontos: [
          { id: 1, x: 10, y: 20 },
          { id: 2, x: 15, y: 25 },
        ],
      })
      .expect(201); // Espera o status 201 Created

    // Verifica se a resposta do POST tem um ID
    expect(createResponse.body).toHaveProperty('_id');
    pontoSetId = createResponse.body._id;

    console.log('ID CAPTURADO DO POST:', pontoSetId);
    console.log('TIPO DO ID CAPTURADO:', typeof pontoSetId);

    // ETAPA 2: Usar o ID retornado para calcular a rota com GET /rotas/:id
    const calculateResponse = await request(app.getHttpServer())
      .get(`/rotas/${pontoSetId}`)
      .set('x-api-key', apiKey) // <-- Autenticação aqui também
      .expect(200); // Espera o status 200 OK

    // Verifica se a resposta do cálculo tem a estrutura correta
    expect(calculateResponse.body).toHaveProperty('rota');
    expect(calculateResponse.body).toHaveProperty('distanciaTotal');
    expect(calculateResponse.body.distanciaTotal).toBeCloseTo(7.07, 2);
  });
  
    afterAll(async () => {
     if (app) { 
       await app.close();
     }
    }, 30000);
});