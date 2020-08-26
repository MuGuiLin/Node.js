const Koa = require('koa');
const Router = require('koa-router')();

const App = new Koa();


// 应用级中间件(匹配路由前做的一系列操作) 匹配所有任何路由（就是访问任何路由，都在先执行一下中间件）
App.use(async (ctx, next) => {
    
    console.log('每次任何【访问前】：都要执行：', new Date());

    /**
     * 在这里可以做很多事，如：判断用户是否登录、设置API跨域请求 等等，
     */
    
    await next(); // 注：一定要加上await next(); 不然程序不会向下执行！！


    console.log('每次任何【访问后】：都要执行：', new Date());

    // 错误处理
    /**
     * 上面的await next()后，程序会去询找对应的路由，不管能不能找到，最后都会返回到这里！！！
     */

    if(404 == ctx.status) {

        // 如果找不到路由，就执行这里！
        ctx.body = `<h1 style="color:red; text-align: center; line-height:200px; font-size:100px;">${ctx.status}`;
    } else {

        // 找到了路由，就执行这里！
        console.log('当前访问的路由地址：', ctx.url);
    }
});



Router


    // 路由中间件 （当有多个相同路由时，如何操作（如：已经匹配到路由了，是否继续向下查找））
    .get('/', async (ctx, next) => {

        ctx.body = `<h1>中间件App.use()1<hr><h2>`;
        console.log('已经匹配到路由了1');

        await next();  // 继续向下查找
    })

    .get('/', async (ctx, next) => {

        ctx.body = `<h1>中间件App.use()2<hr><h2>`;
        console.log('已经匹配到路由了2');

        await next();  // 继续向下查找
    })


    .get('/', async (ctx, next) => {
        // await
        const str = `
        通俗的讲：中间件App.use() 就是匹配路由之前(如：访问API前判断用户是否登录)或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。

            在 express 中间件（Middleware）是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 
        和 web 应用中处理请求-响应循环流程中的中间件，一 般被命名为 next 的变量。在 Koa 中中间件和 express 有点类似。

        中间件的功能包括：
            * 执行任何代码。
            * 修改请求和响应对象。
            * 终结请求-响应循环。
            * 调用堆栈中的下一个中间件。

        如果我的 get、post 回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写 next()

        Koa 应用可使用如下几种中间件：
            * 应用级中间件
            * 路由级中间件
            * 错误处理中间件
            * 第三方中间件
        `

        ctx.body = `<h1>中间件App.use()<hr><h2><pre>${str}`;
    })
    .get('/login', async (ctx, next) => {

        ctx.body = '欢迎登录';
    })
    .get('/news', async (ctx, next) => {

        ctx.body = '我是新闻页';
    })




App
    .use(Router.routes())  // 路由注入
    .use(Router.allowedMethods())  // 自动设置响应头
    .listen('3004', () => {
        console.log('监听：127.0.0.1:3004');
    });