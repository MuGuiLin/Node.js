
const router = require('koa-router')();

const db = require('../models/db.js');

const nav = [
    {name: '管理首页'},
    {name: '新闻管理'},
    {name: '轮播图管理'},
    {name: '用户管理'},
]

/**
 * 路由模块化 之 后台管理视图模块
 */
module.exports = router

    // 管理首页
    .get('/', async (ctx, next) => {
        // 渲染index.html
        await ctx.render('admin/index');
    })

    // 登录页
    .get('/login', async (ctx, next) => {
        await ctx.render('admin/login');

    })

    // 用户管理
    .get('/users', async (ctx, next) => { 
        const data = {
            list: await db.find('users', {})
        }
        await ctx.render('admin/users', data);
    })

    // 新增用户
    .get('/addUser', async (ctx, next) => {
        await ctx.render('admin/addUser');
    })

    // 编辑用户(详情)
    .get('/userInfo/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data = await db.find('users', { _id: db.ObjectId(id) });
        await ctx.render('admin/editUser', data[0]);
    })

    // 新闻管理
    .get('/news', async (ctx, next) => { 
        await ctx.render('admin/news');
    })

   



