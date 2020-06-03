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
        ctx.body = '<h1>动态路由！</h1><a href="/news">进入新闻页</a>：127.0.0.1:3003';
    })

    .get('/news', async (ctx, next) => {

        ctx.body = '<h1>我是新闻页！</h1><a href="/newsInfo/xxx">动态路由传参</a>，<a href="/listInfo/666/mupiao/admin123">动态路由传多个参</a>'
    })

    // 动态路由(路由传参)  http://localhost:3003/newsInfo/xxx
    .get('/newsInfo/:pid', async (ctx, next) => {

        // 获取 get动态路由传参 ctx.params 

        console.log('\n params', ctx.params);

        ctx.body = `<h1>我是新闻详情页！</h1>这是动态路由传来的参数：${JSON.stringify(ctx.params)}，【注：pid 是后端自定义的接收key，只要在http://127.0.0.1:3003/newsInfo/后面传的参数我都能获取到】`; 
    })

    // 动态路由(路由传多个参)  http://127.0.0.1:3003/listInfo/666/mupiao/admin123
    .get('/listInfo/:uid/:name/:pwd', async (ctx, next) => {

        console.log('\n params', ctx.params);

        ctx.body = `<h1>我是列表详情页！</h1>这是动态路由传来的多个参数：${JSON.stringify(ctx.params)}`; 
    })



// 启动路由，监听端口
App
    .use(Ror.routes())  // 路由注入
    .use(Ror.allowedMethods())  // 自动设置响应头
    .listen('3003', () => {
        console.log('监听：127.0.0.1:3003');

    });