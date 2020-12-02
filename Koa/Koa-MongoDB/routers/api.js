
const router = require('koa-router')();
const db = require('../models/db.js');

/**
 *  路由模块化 之 Api接口模块
 */
router
    .get('/', async (ctx, next) => {
        ctx.body = ' OK Api接口模块';
    })

    // 登录接口
    .get('/login', async (ctx, next) => {
        ctx.body = '登录接口';
    })


    // 参数获取 localhost:3000/info?di=666
    .get('/info', async (ctx, next) => {
        console.log('接收参数是一个对象：', ctx.query);
        console.log('接收参数是一个字符串：', ctx.querystring);

        console.log('接收参数是一个对象：', ctx.request.query);
        console.log('接收参数是一个字符串：', ctx.request.querystring);

        console.log('ctx.url：', ctx.url);
        console.log('ctx.URL：', ctx.URL);
        ctx.body = '666';
    })

    /**
     *  动态路由(可传参 多个参数用/隔开)
     *  http://127.0.0.1:3000/package/123/456/789
     *  注：这里配置了几个参数，在请求接口是也要对应传几个参数（多传少传都报错），
     */
    .get('/package/:aid/:bid/:cid', async (ctx, next) => {
        console.log('接收到的参数：', ctx.params);

        ctx.body = ctx.params;
    })

    // 新增用户
    .post('/addUser', async (ctx, next) => {
        let data = {
            "username": "小明",
            "password": "666",
            "sex": 1,
            "age": 28,
            "email": "muguilin@foxmail.com",
            "phone": "13558793025",
            "hobbys": [1, 2, 3]
        };
        data = ctx.request.body;
        const { result } = await db.insert('users', data);
        // const { result } = await db.insertOne('users', data);
        if (result.ok) {
            ctx.body = result;
            ctx.redirect('/admin/user');
        }
    })

    // 编辑用户
    .post('/editUser', async (ctx, next) => {
        const data = ctx.request.body;
        const _id = data._id;
        delete data._id;
        const { result } = await db.updateOne('users', { _id: db.ObjectId(_id) }, data);
        try {
            if (result.ok) {
                ctx.redirect('/admin/user');
            }
        } catch (error) {
            ctx.body = error;
        }
    })

    // 删除用户
    .get('/delUser/:id', async (ctx, next) => {
        const { id } = ctx.params;
        // const id = ctx.query.id; // <form  action="/api/editUser"  method="get"
        const { result } = await db.removeOne('users', { _id: db.ObjectId(id) });
        result.ok && ctx.redirect('/admin/user');
    })


    // 新增新闻
    .post('/addNews', async (ctx, next) => {
        let data = {
            "username": "小明",
            "password": "666",
            "sex": 1,
            "age": 28,
            "email": "muguilin@foxmail.com",
            "phone": "13558793025",
            "hobbys": [1, 2, 3]
        };
        data = ctx.request.body;
        const { result } = await db.insertOne('news', data);
        if (result.ok) {
            ctx.body = result;
            ctx.redirect('/admin/news');
        }
    })

    .post('/update', async (ctx, next) => {
        // 原生node.js获取POST表单提交的数据
        // const nodePostDate = await new Promise((resolve, reject) => {
        //     try {
        //         let str = '';
        //         ctx.req.on('data', (chunk) => {
        //             str += chunk;
        //         });
        //         ctx.req.on('end', (chunk) => {
        //             resolve(str);
        //         });
        //     } catch (err) {
        //         reject(err);
        //     }
        // });
        // console.log('原生node.js获取POST:', nodePostDate);
        // ctx.body = nodePostDate;

        // 第三方插件 koa-body获取POST表单提交的数据

        const koaBodyPostDate = ctx.request.body;
        const koaBodyPostFileDate = ctx.request.files; // 文件数据

        console.log('第三方插件 koa-body获取POST:', koaBodyPostDate);
        console.log('第三方插件 koa-body获取POST文件数据:', JSON.stringify(koaBodyPostFileDate));

        ctx.body = koaBodyPostDate;
    })

// 向下暴露 Api路由并启动
; module.exports = router.routes();

