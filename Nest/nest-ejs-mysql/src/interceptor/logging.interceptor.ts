/**
 * 拦截器
 * https://docs.nestjs.com/interceptors#aspect-interception
 * https://www.nestjs.com.cn/interceptors
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截器前置部分 Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        console.log(`拦截器后置部分 After...`, res);

        const takeTime = Date.now() - now;
        console.log(`请求消耗时间：${takeTime}毫秒(ms)`);

        // 对响应数据进行处理
        res.data.time = takeTime + 'ms';
      }),
    );
  }
}
