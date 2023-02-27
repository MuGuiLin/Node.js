import { Controller, Get, Render } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';

@Controller('bootstrap')
export class BootstrapController {
  constructor(private readonly bootstrapService: BootstrapService) {}

  @Get()
  @Render('admin/bootstrap/index')
  getBootstrap() {
    return this.bootstrapService.getData({
      title: '用 Bootstrap 构建快速、响应式布局的网站',
    });
  }
}
