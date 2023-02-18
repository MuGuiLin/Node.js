import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { CoreService } from '../Core/service';

@Controller()
export class AppController {
  private readonly show;
  constructor(private readonly appService: AppService,
    private readonly coreService: CoreService) {
      // 重定义Logger方法
      this.show = new Logger;
  }

  @Get()
  getHello(): string {
    Logger.log(JSON.stringify(this));
    this.show.log(JSON.stringify(this));
    
    return this.appService.getHello();
  };

  @Get('cores')
  getCores(): string {
    return '我是在app模块中引用了外向暴露的CoreService方法' + this.coreService.getCore();
  }
}
