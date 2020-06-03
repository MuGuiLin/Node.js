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
/**
    1、get  /url/xxx 查看
    2、post /url/xxx 创建  
    3、del  /url/xxx 删除 
    4、put  /url/xxx 更新
    
 */
Ror
    .get('/', async (ctx, next) => {
        // await
        const str = `
            路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）
        组成的，涉及到应用如何响应客户端对某个网站节点的访问。
        通俗的讲：路由就是根据不同的 URL 地址，加载不同的页面实现不同的功能。
        
        Koa 中的路由和 Express 有所不同，在 Express 中直接引入 Express 就可以配置路由，但是在
        Koa 中我们需要安装对应的 koa-router 路由模块来实现。

        <a target="_blank" href="https://www.npmjs.com/package/koa-router">https://www.npmjs.com/package/koa-router</a>

        <code>npm install --save koa-router`

        ctx.body = `<h1>666，欢迎访问：http://localhost:3001<hr><h2><pre>${str}`; // body 相当于原于的res.send()
    })
    .post('/login', async (ctx, next) => {

    })
    .post('/list', async (ctx, next) => {

    })
    .put('/update', async (ctx, next) => {

    })
    .del('/remove', async (ctx, next) => {

    })

// .all('*', async (ctx, next) => {

// })


// 启动路由，监听端口
App
    .use(Ror.routes())  // 路由注入
    .use(Ror.allowedMethods())  // 自动设置响应头
    .listen('3001', () => {
        console.log('监听：127.0.0.1:3001');

    });