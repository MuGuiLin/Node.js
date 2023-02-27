/**
 * 自定义装饰器
 * https://docs.nestjs.com/custom-decorators
 * https://www.nestjs.com.cn/custom-decorators
 * Nest 是围绕一种称为装饰器的语言功能构建的。装饰器在许多常用的编程语言中是一个众所周知的概念，但在 JavaScript 世界中，它们仍然相对较新。为了更好地了解装饰器的工作原理，我们建议您阅读本文。这里有一个简单的定义：
 * ES2016 装饰器是一个返回函数的表达式，可以将目标、名称和属性描述符作为参数。您可以通过在装饰器前面加上一个字符并将其放在您要装饰的内容的最顶部来应用它。可以为类、方法或属性定义装饰器。@
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 自定义装饰器 UserLevel
 */
export const UserLevel = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('Http Get请求：', request);

    const userLevel = request.userLevel;

    console.log('userLevel------------------', userLevel);
    // 如果在调用这个自定义的装饰器时，传了key参数过来，就返回指定的数据字段，不然用全部返回
    return userLevel[key] || userLevel;
  },
);
