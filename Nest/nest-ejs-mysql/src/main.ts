import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { GlobalInterceptor } from './interceptor/global.interceptor';

async function bootstrap() {
  // 创建应用服务
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 允许跨域请求配置方式1;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // 允许跨域请求配置方式2(注：尽量配置在最前面)
  // app.enableCors();

  // 静态资源路径配置
  app.useStaticAssets(join(__dirname, '..', 'assets'), {
    prefix: '/static/', //设置虚拟路径
  });

  // 视图文件路径配置
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 视图模板引擎配置
  // app.setViewEngine('art');
  app.setViewEngine('ejs');

  // 全局看守器(作用于所有控制器、子路由)
  // app.useGlobalGuards(new AuthGuard());

  // 全局拦截器(作用于所有控制器、子路由)
  app.useGlobalInterceptors(new GlobalInterceptor());

  // 请求前缀配置 api 是自定义的 【一般正常的api格式：域名/端口号/api/版本号/控制器(项目名)/接口名/参数】
  // app.setGlobalPrefix('api'); // http://localhost:3000/api/users/get?uid=123&age=456&level=100

  // Api版本控制
  app.enableVersioning({
    // defaultVersion: [VERSION_NEUTRAL, '1', '2'], // http://localhost:3000/api/v1/users/get?uid=123&age=456&level=100
    defaultVersion: [VERSION_NEUTRAL],
    type: VersioningType.URI,
  });

  // Api文档生成
  const config = new DocumentBuilder()
    .setTitle('Nest-Server Api develop document')
    .setDescription('Nest-Server API description')
    .setVersion('1.0.1')
    .addTag('Nest-Server')
    .build();
  SwaggerModule.setup('apidoc', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000, () => {
    console.log(
      `\n**************🚀服务已启动，🖥️可在浏览器中访问 📊http://localhost:3000 **************`,
    );
  });
}

bootstrap();
