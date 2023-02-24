import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdmin(): string {
    return '后台管理';
  }
}
