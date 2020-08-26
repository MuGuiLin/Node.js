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
App.use((ctx, next) => {
    ctx.body = JSON.stringify({
        status: 200,
        message: 'OK，666'
    })
});


App.listen(3001, () => {
    console.log('Koa Server, 监听3001端口！');
});