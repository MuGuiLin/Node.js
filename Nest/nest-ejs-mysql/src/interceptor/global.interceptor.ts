/**
 * 拦截器
 * https://docs.nestjs.com/interceptors#aspect-interception
 * https://www.nestjs.com.cn/interceptors
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('全局拦截器前置部分 Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        console.log('全局拦截器后置部分 After...', res);

        const takeTime = Date.now() - now;
        console.log(`请求消耗时间：${takeTime}毫秒(ms)`);
      }),
    );
  }
}
