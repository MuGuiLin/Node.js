import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('admin/index')
  getAdmin() {
    return this.adminService.getAdmin();
  }

  @Get('root')
  getRoot() {
    return {
      name: 'root',
      code: 200,
      text: this.adminService.getAdmin(),
    };
  }
}
