
const router = require('koa-router')();

const user = require('../../models/user.js');
const hobby = require('../../models/hobby.js');

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

        // const data = {
        //     // list: await user.find()
        // 多表查询方式一： 通过mongose提供的 aggregate 来实现关联查询
        //     // 聚合管道查询（多表）
        //     // list: await user.aggregate([
        //     //     {
        //     //         $lookup: {
        //     //             from: 'hobby',
        //     //             localField: 'hobby_id',
        //     //             foreignField: 'hobby_id',
        //     //             as: 'hobbys'
        //     //         }
        //     //     }, {
        //     //         $limit: 10
        //     //     }
        //     // ], (err, docs) => {
        //     //     if (!err) {
        //     //         console.log(docs);
        //     //     }
        //     // });
        // };
        // ctx.render('admin/user/index', data);


        // 多表查询方式二： 通过mongose提供的 populate 来实现关联查询
        // populate 在Schema中通过ref 指定关联外键 类似聚合管道查询（可进行多表）
        // user.find().populate('hid').populate('xxx').exec((err, docs) => { 注：如果多个集合 就在后面.populate('xxx')
        user.find().populate('hid').exec((err, docs) => {
            if (!err) {
                console.log('在Schema中通过ref 指定关联外键 然后用 populate() 进行查询 ---------', docs);
            }
        });

        // 多表查询方式三：自己定义同时要查询的集合
        let list = await user.find(async (err, docs) => {
            if (!err) {
                const res = await hobby.find();
                const data = docs.map((o) => {
                    o.hobbys = o.hobbys.map((item) => res.filter(f => f.hobby_id == item)).join();
                    return o;
                });
                // console.log(data);
            }
        });
        ctx.render('admin/user/index', { list });

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




