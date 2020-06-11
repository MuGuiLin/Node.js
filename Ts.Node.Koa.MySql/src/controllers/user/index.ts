import { Controller, Get, Params, Query, Body, Post, Header } from "koa-ts-controllers";

// 参数类型验证
import { IsNumber, IsNumberString, IsString } from "class-validator";

// 业务逻辑验证[主要用于处理http请求状态反馈] (不用安装，它是koa-ts-controllers内置的)
import Boom from "@hapi/boom";



// Api参数类型验证类
class UserQuery {

    @IsNumberString()
    id: number;

    // @IsNumberString()
    // page: number;

    // @IsString()
    // name: string;

    // @IsNumber()
    // age: number;
}

// @Controller('')      // '' 空表示所有
@Controller('/user')    // '/user' 表示user控制器的 类装饰器
export class UserController {


    @Get('/login')  // login方法(Api接口) 方法装饰器 注: 这是名字就是方法(Api接口的名字哦), 而下面的方法名可以任意写(不能与其他字名重得就OK) 所以一般装饰器名和方法都名一样 
    public async mupiao() {
        return 'OK 登录Api访问成功！';
    };

    @Get('/regist')
    async regist() {
        return 'OK 666';
    };


    // 用参数装饰器 获取客户端传过来的参数
    /**
     * koa-ts-controllers 提供了如下参数装饰器, 分别获取对应的参数
     * @Params() 动态路由可变的那部分
     * @Query() rul?后面的部分
     * @Body() 请求正文部分
     * @Header() 除内置头信息以外的自定义信息
     * 
     * 注：POST请求在app.ts中要安装第三方如koa-bodyparser之类的模块
     */


    // 动态路由GET @Params() 方式 /1024
    //@Params() 获取方式 http://localhost:8080/api/v2/user/user/1024/
    // 如果只有一个参数时
    @Get('/user/:id')
    public async getUser2(@Params('id') id: any) {

        console.log(id);
        return `您传过的用户ID是：${id}`;
    };

    //@Params() 获取方式 http://localhost:8080/api/v2/user/user/2018/666
    // 多个参数时，用/隔开
    @Get('/user2/:id/:pid')
    public async getUser(@Params() par: { id: any, pid: number }) {

        console.log(par);
        return `您传过的用户ID是：${par.id}，PID是：${par.pid}`;
    };

    // 指定id只能是数字
    @Get('/user3/:id(\\d+)')
    public async getUser3(@Params('id') id: any) {

        console.log(id);
        return `您传过的用户ID是：${id}，id只能是数字`;
    };

    // 普通路由GET @Query() 方式 ?id=1024
    //@Query() 获取方式 http://localhost:8080/api/v2/user/user3?id=123456&pid=666
    @Get('/user4')
    public async getUser4(@Query('id') id: any) {

        console.log(id);
        return `您传过的数据：${id}`;
    };

    // UserQuery参数类型验证类
    @Get('/users:id')
    public async userInfo(@Query() q: UserQuery) {  // 在 app.ts中的bootstrapControllers 下面的 errorHandler 会不错误信息

        console.log(q);
        return '用户信息'
    };



    //@Post
    //@Body() 获取方式 http://localhost:8080/api/v2/user/submit
    @Post('/submit')
    public async submit(@Body() body: { name: string, pwd: string, age: number }) {
        
        let key = JSON.parse(Object.keys(body));

        console.log('主体信息', key);
        
        return `您传过的用户名是：${key.name}，今年${key.age}岁啦！`;
    };


    @Post('/submit2')
    public async submit2(@Header() head: any, @Body({ required: true }) body: any) {

        console.log('\n头信息', head);
        console.log('\n主体信息', body);

        // 业务逻辑出现错误时
        // if (1) {
        //     throw Boom.notFound('提交失败', '数据重复！');
        // }

        return {
            code: 100,
            head: head,
            data: {
                name: body.name,
                age: body.age
            }
        };
    };

};