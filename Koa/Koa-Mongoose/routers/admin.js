
const router = require('koa-router')();

const db = require('../models/db.js');

// router.prefix('/admin');

const user = require('./admin/user.js');
const news = require('./admin/news.js');

const nav = [
    { name: '管理首页' },
    { name: '新闻管理' },
    { name: '轮播图管理' },
    { name: '用户管理' },
]

/**
 * 路由模块化 之 后台管理视图模块
 */
router

    // 管理首页
    .get('/', async (ctx, next) => {
        // 渲染index.html
        await ctx.render('admin/index');
    })

    // 登录页
    .get('/login', async (ctx, next) => {
        await ctx.render('admin/login');

    })

    // '轮播图管理
    .get('/banner', async (ctx, next) => {
        await ctx.render('admin/banner');
    })

    // 用户管理 模块
    .use('/user', user) 
    
    // 新闻管理 模块
    .use('/news', news.routes())

; module.exports = router;





