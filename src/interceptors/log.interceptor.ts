import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Colors } from 'colors_terminal';

//Interceptor é executado depois da chamada
//Neste, eu fiz para que me informe quanto tempo está durando a requisição
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const dt = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(
          Colors.blue(
            `[URL: ${request.url} - METHOD: ${request.method}]: ` +
              Colors.green('Time execute: ') +
              Colors.yellow(Date.now() - dt) +
              Colors.green(' /ms'),
          ),
        );
      }),
    );
  }
}
