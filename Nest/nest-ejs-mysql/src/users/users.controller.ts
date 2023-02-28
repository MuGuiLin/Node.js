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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

import { UserLevel } from '../decorator/user.decorator';

class ApiPostAllDTO {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  name?: string;
}

/**
 * @装饰器 在Next.js中大量的使用，很多思想来自于Angural.js
 */
// @UseGuards(AuthGuard) // 看守器(对当前整个控制器起作用)
// @UseInterceptors(LoggingInterceptor) // 拦截器(对当前整个控制器起作用)
@ApiTags('users 用户相关API')
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
  @UseGuards(new AuthGuard(0.1)) // 看守器(传参)
  @Get('get')
  // getUser(
  //   @Query('uid') uid: string,
  //   @Query('age') age: number,
  //   @UserLevel() level: number,
  // ): any {
  //   console.log(level);
  //   return this.usersService.getUser(uid, age);
  // }
  getUser(
    @Query('uid') uid: string,
    @Query('age') age?: number,
    @UserLevel('levelName') levelName?: number,
  ): any {
    console.log(
      `自定义装饰器UserLevel('指定返回levelName字段')--------`,
      levelName,
    );
    return this.usersService.getUser(uid, age);
  }

  // @UseGuards(AuthGuard) // 看守器(只对当前这个子路由起作用)
  // @UseInterceptors(LoggingInterceptor) // 拦截器(只对当前这个子路由起作用)
  @Get('getAll')
  getAllUser(@Headers('auth') auth: string, @Query() pars?: any) {
    console.log('获取Headers参数', auth);
    console.log('获取所有的Get参数，就不用在@Query()中指定参数名了', pars);
    const { uid, age, name } = pars;
    return this.usersService.getUser(uid, age);
  }

  // req.body
  @ApiOperation({ summary: `单个动态路由获取 getOne/:uid, @Param('uid')` })
  // 单个动态路由获取
  @Get('getOne/:uid')
  getOneUser(@Param('uid') uid: string) {
    return this.usersService.getUser(uid);
  }

  @ApiOperation({
    summary: `多个动态路由获取 getTwo/:uid/:age, @Param('uid'), @Param('age')`,
  })
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
  @Post('post')
  PostUser(
    @Body('uid') uid: string,
    @Body('age') age: number,
    @Body('name') name?: string,
  ) {
    return this.usersService.getUser(uid, age);
  }

  /**
   * Post参数获取
   * @param payload
   * @returns
   */
  @Post('postAll')
  PostAllUser(@Body() payload: ApiPostAllDTO) {
    console.log(payload);
    return this.usersService.getUser(payload);
  }
}
