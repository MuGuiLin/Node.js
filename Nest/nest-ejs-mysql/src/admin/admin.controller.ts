import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('admin/index')
  getAdmin() {
    return this.adminService.getAdmin();
  }

  @ApiOperation({ summary: '返回root信息' })
  @Get('root')
  getRoot() {
    return {
      name: 'root',
      code: 200,
      text: this.adminService.getAdmin(),
    };
  }
}
