const views = require('koa-views');

const Koa = require('koa'),
    Path = require('path'),
    Static = require('koa-static'),
    Router = require('koa-router')(),
    Render = require('koa-art-template');



const App = new Koa();

// 配置koa-art-template模板引擎
Render(App, {
    root: Path.join(__dirname, './views'),          // 配置视图文件路径
    // extname: '.art',                                // 配置模板文件后缀名
    // extname: '.ejs',                                // 配置模板文件后缀名
    extname: '.html',                                // 配置模板文件后缀名
    debug: process.env.NODE_ENV !== 'production'    // 跟据环境开启调试功能
});

App
    .use(async (ctx, next) => {

        // 公共数据，在所有路由、页面中都直接获取访问
        ctx.state.userInfo = {
            user_id: '018010597',
            user_name: '沐枫',
            age: 29,
            mobile: '18198353918',
            job: 'Web全栈开发工程师'
        };
        await next();

        if (404 == ctx.status) {
            // ctx.body = '404';
            await ctx.render('notPage', {
                status: ctx.status
            })
        } else {
            console.log('当前访问的路由地址：', ctx.url);
        }
    })

    // 配置静态资源中间件
    .use(Static('./static'))

    .use(Static(__dirname + '/public'))  // 可以配置多个静态资源中间件

Router
    .get('/', async (ctx, next) => {
        let data = {
            url: ctx.url,
            name: '欢迎访问首页！Koa-Art-Template 模板引擎'
        }
        // ctx.body = 666;
        await ctx.render('index', data);
    })

    .get('/news', async (ctx, next) => {
        let list = [];

        for (let i = 0; i < 5; i++) {
            list.push({ id: i, title: '标题', content: `<p>${Math.random()}</p>` })
        };

        await ctx.render('news', {
            list: list,
            rdom: Math.random(),

        });
    })

    .get('/about', async (ctx, next) => {

        await ctx.render('about');
    })




App
    .use(Router.routes())
    .use(Router.allowedMethods())
    .listen('666', () => {
        console.log('666')
    })