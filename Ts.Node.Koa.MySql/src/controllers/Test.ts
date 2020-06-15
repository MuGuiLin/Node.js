import { Controller, Get, Params, Query, Body, Post, Header } from "koa-ts-controllers";

// 参数类型验证
import { IsNumberString, IsNumber, IsString } from "class-validator";

// 业务逻辑验证[主要用于处理http请求状态反馈] (不用安装，它是koa-ts-controllers内置的)
import Boom from "@hapi/boom";

// users Api接品参数类型验证类（当然这个类型验证可以在外部做成一个模块导来哦）
class UserQuery {

    @IsNumberString()
    id: number;

    @IsString()
    name: string;

    @IsString()
    sex: number;

    @IsNumberString()
    age: number;
}


// @Controller('')      // '' 空表示所有
@Controller('/test')    // '/test' 表示test控制器的类装饰器
export class TestClass {

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


    // hello方法名(也就是Api接口名) 方法装饰器 注: 这是名字就是方法(Api接口的名字哦), 而下面的方法名可以任意写(不能与其他字名重得就OK) 所以一般装饰器名和方法都名一样
    @Get('/hello')
    // 请示地址：http://localhost:8080/api/v2/test/hello
    async hello(@Header() head: any) {
        return `<h1>OK 测试Api接口调用成功！ <hr/> <br/> 请求头信息：<br/>` + JSON.stringify(head);
    }


    /**
     * GET方式 之 动态路由 /xxx 用 @Params() 接收参数
     */


    // 请求地址 http://localhost:8080/api/v2/test/myapi/1024   （test/控制器 myapi/接口名 1024参数）
    @Get('/myapi/:id') // 只有一个参数时
    public async getUser2(@Params('id') id: any) {

        console.log(id);
        return {
            data: `您传过的用户ID是：${id}`
        };
    };


    // 请求地址 http://localhost:8080/api/v2/test/myapi2/2018/666
    @Get('/myapi2/:id/:pid') // 多个参数时，用/隔开
    public async getUser(@Params() par: { id: any, pid: number }) {

        console.log(par);
        return {
            data: `您传过的用户ID是：${par.id}，PID是：${par.pid}`
        };
    };


    // 请求地址 http://localhost:8080/api/v2/test/myapi3/123456
    @Get('/myapi3/:id(\\d+)') // 指定id只能是数字
    public async getUser3(@Params('id') id: any) {

        console.log(id);
        return {
            data: `您传过的用户ID是：${id}，id只能是数字`
        };
    };

    // 请求地址 http://localhost:8080/api/v2/test/myapi4/888/沐枫/男/28
    @Get('/myapi4/:id/:name/:sex/:age') // 指定id只能是数字 // 多个参数 + 参数类型验证
    public async getUser4(@Params() par: UserQuery) {
        console.log('/myapi4：', par);
        return {
            code: 100,
            data: par
        };
    };



    /**
     * GET方式 之 普通路由 ?xx=xxx 用 @Query() 接收参数
     */

    // 请求地址 http://localhost:8080/api/v2/test/myapi5?id=123456
    @Get('/myapi5')
    public async getUser5(@Query('id') id: any) {
        console.log('/myapi5：', id);
        return {
            code: 100,
            data: `您传过的数据：${id}`
        };
    };


    // 参数类型验证
    // 请求地址 http://localhost:8080/api/v2/test/myapi6?id=123456&name=沐枫&sex=男&age=28
    @Get('/myapi6')
    public async userInfo(@Query() par: UserQuery) {  // 当传过来的参数不符合UserQuery中的验证规则时app.ts中的bootstrapControllers中的errorHandler会有错误信息
        console.log('/myapi6：', par);
        return {
            code: 100,
            data: par
        };
    };







    /**
    * POST方式 用 @Body() 接收参数
    */


    // 请求地址 http://localhost:8080/api/v2/test/submit
    @Post('/submit')
    public async submit(@Body() body: { name: string, age: number, job: string }) {

        // let key = JSON.parse(Object.keys(body));
        // console.log('主体信息', key);
        console.log('主体信息', body);

        return {
            data: `您传过的用户名是：${body.name}，今年${body.age}岁，从事${body.job}工作！`
        };
    };


    // 请求地址 http://localhost:8080/api/v2/test/submit2
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

    // 请求地址 http://localhost:8080/api/v2/test/submit3
    @Post('/submit3')
    public async submit3(@Body() body: UserQuery) {  // 参数类型验证
        return {
            code: 100,
            data: body
        };
    };

}