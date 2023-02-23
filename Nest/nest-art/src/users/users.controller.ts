// import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('admin/users/index')
  getUserRender() {
    return { name: '沐枫', age: 18 };
  }

  @Get('get')
  getUser() {
    return this.usersService.getUser();
  }

  @Get('getAll')
  getAllUser() {
    return this.usersService.getUser('all');
  }
}
