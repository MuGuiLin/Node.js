import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('admin/users/index')
  getAdmin() {
    return this.adminService.getAdmin();
  }
}
