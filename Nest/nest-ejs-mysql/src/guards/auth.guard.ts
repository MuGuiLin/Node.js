/**
 * 守卫(看守器，一般多用于用户登录鉴权)
 * https://docs.nestjs.com/guards#authorization-guard
 * https://www.nestjs.com.cn/guards
 */

// @@filename(auth.guard)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private mupiao: number = 0.5) {
    // console.log('接收看守器在调用时传过来的参数：', mupiao);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('请求上下文：', context);

    // const request = context.switchToWs(); // WebSocket
    const request = context.switchToHttp().getRequest(); // Http
    // console.log('Http Get请求：', request);
    // console.log('请求头headers', request.headers);

    const level = Number(request.query?.level || '0');

    // 处理请求数据
    request.userLevel = {
      level,
      levelName: 99 < level ? 'VIP用户' : '普通用户',
    };

    // return validateRequest(request);
    // 如果返回true就进行一下步操用，返回false则终止请求，所auth 鉴权是 Guards 的一个很好的用例，因为仅当调用方（通常是经过身份验证的特定用户）具有足够的权限时，特定路由才应可用。
    // return true;

    console.log('接收看守器在调用时传过来的参数：', this.mupiao);
    return Math.random() > this.mupiao;
  }
}
