import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const expectedApiKey = this.configService.get<string>('API_KEY');
    
    const providedApiKey = request.headers['x-api-key'];
    // Compara as duas chaves. Se forem iguais, permite o acesso (return true).
    // Se não, o NestJS automaticamente retorna um erro 403 Forbidden.
    return expectedApiKey === providedApiKey;
  }
}
