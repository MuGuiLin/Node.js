import Koa, { Context } from 'koa';
import KoaRouter from "koa-router";
import KoaBodyParser from "koa-bodyparser";
import { bootstrapControllers, Ctx } from "koa-ts-controllers";

import Config from './config'

// 异步处理
(async () => {
    const App = new Koa();

    const Router = new KoaRouter();

    App.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");

        //console.log(ctx);
        await next();

        // if (404 == ctx.status) {
        //     ctx.body = 404;
        // }
    });
    
    // 路由管理
    await bootstrapControllers(App, {
        router: Router,
        controllers: [__dirname + '/controllers/**/*.ts'], // 建议将控制器类直接添加到此数组，但是您也可以添加全局字符串（匹配controllers目录下的所以文件分析类指定到路由对象中）
        // 访问规则 localhost:8080/api/v2/ + 控制器/接口
        basePath: '/api',
        versions: {
            1: '此版本已弃用，不久将被删除。 考虑尽快迁移到版本v2',  // 可以同时开多个版本，这个是虽然能用，但是有警告信息
            2: true, // 正常访问
            dangote: true // 非常适合定制，业务客户端特定的端点版本
        },
        // errorHandler: async (err: any, ctx: { body: { error: any; }; status: number; }) => { // 可选的错误处理程序
        //     console.log('err', err);
        //     ctx.body = { error: err };
        //     ctx.status = 500
        // },
        errorHandler: async (err: any, ctx: Context) => { // 可选的错误处理程序
            // console.log(err);
            let status: number = 500;
            let body: any = {
                statusCode: status,
                error: 'Server Error！',
                message: 'API发生内部服务器错误！'
            };

            // 当有参数类型验证错误时
            if (err && err.output) {
                status = err.output.statusCode;
                body = { ...err.output.payload };
                if (err.data) {
                    body.errorInfo = err.data;
                }
            }

            ctx.status = status;
            ctx.body = body;
        }
    });

    // Router.all('*', async (ctx, next) => {
    //     ctx.set("Access-Control-Allow-Origin", "*");
    //     await next();
    // });


    // 注册获取post参数模块
    App.use(KoaBodyParser());

    // 注册路由
    App.use(Router.routes());

    // 监听服务
    App.listen(Config.server.prot, Config.server.host, () => {
        console.log('服务启动成功：监听' + Config.server.prot + ':' + Config.server.host);
    });
})();
