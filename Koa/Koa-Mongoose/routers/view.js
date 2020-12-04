
const router = require('koa-router')();

const db = require('../models/db.js');

/**
 *  路由模块化 之 前台视图模块
 */

const data = {
    name: '沐枫',
    list: ['HTML5', 'CSS3', 'ES6', 'Node.js', 'Vue', 'React', 'Angular']
};

module.exports = router

    // 首页
    .get('/', async (ctx, next) => {
       
        // 渲染index.html
        await ctx.render('index', data);
    })

    // 登录页
    .get('/login', async (ctx, next) => {

        await ctx.render('login');
    })

    // 关于页
    .get('/about', async (ctx, next) => {

        await ctx.render('about', data);
    })

     // 新闻页
     .get('/news', async (ctx, next) => {

        await ctx.render('news', data);
    })


