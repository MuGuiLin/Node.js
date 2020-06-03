const Koa = require('koa');
const Router = require('koa-router');


// 实例化
const App = new Koa();
const Ror = new Router();

// const Router = require('koa-router');
// const Ror = new Router();

// 上面这两句可以简写为下面这句 引入并实例化路由
// const Ror = require('koa-router')();   



// 配置路由 注：ctx(上下文对象)，它包括了request 和response
Ror
    .get('/', async (ctx, next) => {
        // await
        ctx.body = '<h1>我是默认页！</h1><a href="/news">进入新闻页</a> koa-router-get传取参数：127.0.0.1:3002';
    })

    .get('/news', async (ctx, next) => {

        ctx.body = '<h1>我是新闻页！</h1><a href="/newsInfo?id=1025&page=2">进入新闻详情页</a>'
    })


    .get('/newsInfo', async (ctx, next) => {

        /** 获取 get路由传参  先访问：http://localhost:3002/newsInfo?id=1025&page=2
         * ctx 对象包含了 所有url和相关请求信息
         * ctx.query 接收格式化好的参数对象
         * ctx.querystring 接收字符串参数对象
         * ctx.request 
         */
        console.log('\n ctx', ctx);
        console.log('\n url', ctx.url);
        console.log('\n query', ctx.query);
        console.log('\n querystring', ctx.querystring);

        // 在ctx.request对象下有的很多参数
        console.log('\n request', ctx.request.url);
        console.log('\n request', ctx.request.query);
        console.log('\n request', ctx.request.querystring);

        ctx.body = `<h1>我是新闻详情页！</h1>这是你传来的参数：{id:${ctx.query.id}，page:${ctx.query.page}}，url是：${ctx.request.toJSON}`;

    })



// 启动路由，监听端口
App
    .use(Ror.routes())  // 路由注入
    .use(Ror.allowedMethods())  // 自动设置响应头
    .listen('3002', () => {
        console.log('监听：127.0.0.1:3002');

    });