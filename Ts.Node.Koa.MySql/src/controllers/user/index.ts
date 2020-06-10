import { Controller, Get, Params, Query, Body, Post } from "koa-ts-controllers";

// @Controller('')      // '' 空表示所有
@Controller('/user')    // '/user' 表示user控制器的 类装饰器
class UserController {


    @Get('/login')  // login方法(Api接口) 方法装饰器 注: 这是名字就是方法(Api接口的名字哦), 而下面的方法名可以任意写(不能与其他字名重得就OK) 所以一般装饰器名和方法都名一样 
    public async mupiao() {
        return 'OK 登录Api 访问成功！';
    };

    @Get('/regist')
    async regist() {
        return 'OK 666';
    };


    // 用参数装饰器 获取客户端传过来的参数
    /**
     * koa-ts-controllers 提供了如下参数装饰器, 分别获取对应的参数
     * @Params()
     * @Query()
     * @Body()
     * @Header()
     */


    //@Params() 获取方式 http://localhost:8080/api/v2/user/user/1024
    @Get('/user/:id')
    public async getUser(@Params() par: { id: any, pid: number }) {
        console.log(par)
        return `您传过的用户ID是：${par.id}`;
    };

    // 如果只有一个参数 还可以这样写
    @Get('/user2/:id')
    public async getUser2(@Params('id') id: any) {
        console.log(id)
        return `您传过的用户ID是：${id}`;
    };

    //@Query() 获取方式 http://localhost:8080/api/v2/user/user3?id=123456
    @Get('/user3')
    public async getUser3(@Query('id') id: any) {
        console.log(id)
        return `您传过的用户ID是：${id}`;
    };


    //@Post
    //@Body() 获取方式 http://localhost:8080/api/v2/user/submit
    @Post('/submit')
    public async submit(@Body() body: { name: string, pwd: string, age: number }) {
        console.log(JSON.stringify(body))
        return `您传过的用户名是：${body.name}，今年${body.age}岁啦！`;
    };


    @Post('/submit2')
    public async submit2(@Body({ required: true }) body: any) {
        console.log(JSON.stringify(body))
        return `您传过的用户名是：${body.name}，今年${body.age}岁啦！`;
    };

};