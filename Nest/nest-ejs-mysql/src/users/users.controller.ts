import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  Next,
  Session,
  Headers,
  Query,
  Param,
  Post,
  Body,
  Ip,
  HostParam,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('admin/users/index')
  getUserRender() {
    return { name: '沐枫', age: 18 };
  }

  /**
   * Api参数获取说明：
   *        Request, Response, Next, Session, Headers, Query, Param, Body, Ip, HostParam,
   * https://docs.nestjs.com/controllers#request-object
   */

  // req.params
  @Get('get')
  getUser(@Query('uid') uid: string, @Query('age') age: number): any {
    return this.usersService.getUser(uid, age);
  }

  @Get('getAll')
  getAllUser(@Headers('auth') auth: string, @Query() pars?: any) {
    console.log('获取Headers参数', auth);
    console.log('获取所有的Get参数，就不用在@Query()中指定参数名了', pars);
    const { uid, age, name } = pars;
    return this.usersService.getUser(uid, age);
  }

  // req.body
  // 单个动态路由获取
  @Get('getOne/:uid')
  getOneUser(@Param('uid') uid: string) {
    return this.usersService.getUser(uid);
  }

  // 多个动态路由获取
  @Get('getTwo/:uid/:age')
  getTwoUser(@Param('uid') uid: string, @Param('age') age: number) {
    return this.usersService.getUser(uid, age);
  }

  /**
   * Post参数获取
   * @param uid
   * @param age
   * @returns
   */
  @Post('get')
  PostUser(
    @Body('uid') uid: string,
    @Body('age') age: number,
    @Body('name') name?: string,
  ) {
    return this.usersService.getUser(uid, age);
  }
}
