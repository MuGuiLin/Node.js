/**
 * Node.js 原生 http 服务
 */
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('<h1>http.createServer()</h1><hr/>')
});

server.listen(3000, () => {
    console.log('Http Server, 监听3000端口！');
});

/**
 * 自定义Koa http 服务
 */
const Koa = require('./my-koa/koa');
const App = new Koa();


// App.use((req, res) => {
//     res.writeHead(200);
//     res.end('<h1>MyKoa Http Server</h1><hr/>');
// })

// 简化上面的调用方式 ctx === Context上下文 //https://koa.bootcss.com/#context
// App.use((ctx) => {
//     ctx.body = JSON.stringify({
//         status: 200,
//         message: 'OK 666'
//     });
// });


/**
 * 组合函数调用 - 责任链模式
 * 洋葱圈模型：从外到内，然后从内到外的执行顺序
 */
App.use(async (ctx, next) => {
    ctx.body = '1\n';
    console.log('执行顺序-1');

    await next();
    console.log('执行顺序-7');
});

App.use(async (ctx, next) => {
    ctx.body += '2\n';
    console.log('执行顺序-2');

    await next();
    console.log('执行顺序-6');
});

App.use(async (ctx, next) => {
    ctx.body += '3\n';
    console.log('执行顺序-3');

    await next();
    console.log('执行顺序-5');
});

App.use(async (ctx, next) => {
    ctx.body += '4\n';
    console.log('执行顺序-4');
    await next();
});

// 自定义实现路由
const Router = require('./my-koa/router');
const router = new Router();

router.get('/index', async (ctx) => {
    ctx.body = 'index-page'
});

router.get('/about', async (ctx, next) => {
    ctx.body = 'about-page'
});

router.get('/info', async (ctx, next) => {
    ctx.body = 'info-page'
});

router.post('/login', async (ctx, next) => {
    ctx.body = 'login-page'
});

// 路由实例
App.use(router.routes())

App.listen(3001, () => {
    console.log('Koa Server, 监听3001端口！');
});