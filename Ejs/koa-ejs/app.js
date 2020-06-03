const Koa = require('koa');
const Router = require('koa-router')();
const Views = require('koa-views');
const Static = require('koa-static');

const App = new Koa();

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

    // 配置模板引擎中间件 模板方式1【模板文件 后缀名一定要用.ejs】
    .use(Views('./template', {
        extension: 'ejs'
    }))

// 配置模板引擎中间件 模板方式2【模板文件 是一个标准的html文件】
// .use(Views('./template'), {
//     map: { html: 'ejs' }
// })


Router
    .get('/', async (ctx, next) => {

        let data = {
            url: ctx.url,
            name: '欢迎访问首页！Koa-Ejs 模板引擎'
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
    .listen('3000', () => {
        console.log('koa-ejs :3000')
    });