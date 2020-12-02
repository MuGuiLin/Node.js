
const router = require('koa-router')();

const db = require('../../models/db.js');

// router.prefix('/user');


/**
 * 路由模块化 之 后台用户管理视图模块
 */
; router

    // 用户列表
    .get('/', async (ctx, next) => {
        const data = {
            list: await db.find('users', {})
        }
        await ctx.render('admin/user/index', data);
    })

    // 新增用户
    .get('/add', async (ctx, next) => {
        await ctx.render('admin/user/add');
    })

    // 编辑用户
    .get('/edit/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data = await db.find('users', { _id: db.ObjectId(id) });
        await ctx.render('admin/user/edit', data[0]);
    })

    // 用户详情
    .get('/info/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data = await db.find('users', { _id: db.ObjectId(id) });
        await ctx.render('admin/user/info', data[0]);
    })

    ; module.exports = router.routes(); //向外暴露 并 启动路由




