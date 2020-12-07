
const router = require('koa-router')();

const user = require('../../models/user.js');

// router.prefix('/user');


/**
 * 路由模块化 之 后台用户管理视图模块
 */
; router

    // 用户列表
    .get('/', async (ctx, next) => {
        // await user.find({}, {}, (err, doc) => {
        //     if (err) {
        //         console.error("\n*** 查询失败 -->", err);
        //     } else {
        //         ctx.render('admin/user/index', { list: doc });
        //     }
        // });

        const data = {
            list: await user.find()
        };
        ctx.render('admin/user/index', data);
    })

    // 新增用户
    .get('/add', async (ctx, next) => {
        await ctx.render('admin/user/add');
    })

    // 编辑用户
    .get('/edit/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data = await user.find({ _id: id });
        await ctx.render('admin/user/edit', { doc: data[0] });
    })

    // 用户详情
    .get('/info/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const doc = await user.findOne({ _id: id });
        await ctx.render('admin/user/info', { doc });
    })
    
    ; module.exports = router.routes(); //向外暴露 并 启动路由




