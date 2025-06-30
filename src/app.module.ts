import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosModule } from './pontos/pontos.module';
import { RotasModule } from './rotas/rotas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
})
export class AppModule {}