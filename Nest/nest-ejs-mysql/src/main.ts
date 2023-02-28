import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { GlobalInterceptor } from './interceptor/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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

  // Api文档生成
  const config = new DocumentBuilder()
    .setTitle('Nest-Server Api develop document')
    .setDescription('Nest-Server API description')
    .setVersion('1.0.1')
    .addTag('Nest-Server')
    .build();
  SwaggerModule.setup('apidoc', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}

bootstrap();
