import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Pega o objeto da requisição HTTP
    const request = context.switchToHttp().getRequest();
    
    // Pega a chave da API que esperamos (do arquivo .env)
    const expectedApiKey = this.configService.get<string>('API_KEY');
    
    // Pega a chave da API que o cliente enviou no cabeçalho 'x-api-key'
    const providedApiKey = request.headers['x-api-key'];

    // Compara as duas chaves. Se forem iguais, permite o acesso (return true).
    // Se não, o NestJS automaticamente retorna um erro 403 Forbidden.
    return expectedApiKey === providedApiKey;
  }
}
