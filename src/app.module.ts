import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosModule } from './pontos/pontos.module';
import { RotasModule } from './rotas/rotas.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
     ThrottlerModule.forRoot([{
      ttl: 60000, // 60 segundos em milissegundos
      limit: 10,  // 10 requisições por minuto por IP
    }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('Conectando ao MongoDB:', configService.get<string>('MONGO_DB_URL'));
        return {
        uri: configService.get<string>('MONGO_DB_URL'),
        };
      },
      inject: [ConfigService],
    }),
    PontosModule,
    RotasModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}