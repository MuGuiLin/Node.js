import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

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

  await app.listen(3000);
}

bootstrap();
