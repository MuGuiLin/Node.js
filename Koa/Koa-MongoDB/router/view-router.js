
const KoaRouter = require('koa-router')();

module.exports = KoaRouter
    // 首页
    .get('/', async (ctx, next) => {
        const data = {
            name: '沐枫',
            list: ['HTML5', 'CSS3', 'ES6', 'Node.js', 'Vue', 'React', 'Angular']
        }
        // 渲染index.html
        await ctx.render('index', data);
    })

    // 登录页
    .get('/login', async (ctx, next) => {
        await ctx.render('login');

    })

    // 关于页
    .get('/about', async (ctx, next) => {
        await ctx.render('about');
    })

   



