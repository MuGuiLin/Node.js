
const router = require('koa-router')();

const news = require('../../models/news.js');

// router.prefix('/news');


/**
 * 路由模块化 之 后台新闻管理视图模块
 */
; module.exports = router

    // 新闻列表
    .get('/', async (ctx, next) => {
        const data = {
            list: await news.find({})
        }
        await ctx.render('admin/news/index', data);
    })

    // 新增新闻
    .get('/add', async (ctx, next) => {
        await ctx.render('admin/news/add');
    })

    // 编辑新闻
    .get('/edit/:id', async (ctx, next) => {
        const data = await news.find({ _id: ctx.params.id });
        await ctx.render('admin/news/edit', { doc: data[0] });
    })

    // 新闻详情
    .get('/info/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data = await news.findOne({ _id: id });
        await ctx.render('admin/news/info', { doc: data });
    })






