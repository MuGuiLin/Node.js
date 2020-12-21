
const router = require('koa-router')();
const user = require('../models/user.js');
const news = require('../models/news.js');

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
        /**
         * 向users集合插入数据 实例化()、.save()
         * 1、先实例化集合操作模型（实例化时填写要插入的数据）
         * 2、调用save()方法，将数据插入数据库
         *  save()方法 参数1：回调函数监听操作成功与否
         */
        const data = ctx.request.body;
        const add = new user({ ...data });
        const result = await add.save();
        if (result._id) {
            ctx.body = result;
            ctx.redirect('/admin/user');
        }
    })

    // 编辑用户
    .post('/editUser', async (ctx, next) => {
        const data = ctx.request.body;
        const _id = data._id;
        delete data._id;
        const result = await user.updateOne({ _id }, data);
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
        const result = await user.deleteOne({ _id: id });
        result.ok && ctx.redirect('/admin/user');
    })

    // 用户详情 
    .get('/people/:id', async (ctx, next) => {
        const { id } = ctx.params;
        // 静态方法 statics 用回调函数
        await user.getPeople({ _id: id }, (res) => {
            console.log(res);
            ctx.body = res;
        });
    })

    // 获取所有女性用户
    .get('/people2', async (ctx, next) => {
        // 静态方法 statics 用Promise
        const result = await user.getPeople2({sex: 2});
        ctx.status = 200;
        ctx.body = result;
    })

    // 返回 实例方法的 this
    .get('/people3', async (ctx, next) => {
        // 实例方法 methods （注要经过new 后才能用，不像静态方法可以直接调用哦！！）
        const myuser = new user({});
        const result = myuser.mupiao({sex: 2});
        console.log(result);
        ctx.status = 200;
        ctx.body = result;
    })

    // 新增新闻
    .post('/addNews', async (ctx, next) => {
        const data = ctx.request.body;
        const result = await new news(data).save();
        if (result._id) {
            ctx.body = result;
            ctx.redirect('/admin/news');
        }
    })

    // 编辑新闻
    .post('/editNews', async (ctx, next) => {
        try {
            const data = ctx.request.body;
            const _id = data._id;
            delete data._id;
            await news.updateOne({ _id }, { $set: data }, (err, res) => {
                if (err) {
                    ctx.body = err;
                } else {
                    ctx.redirect('/admin/news');
                }
            });
        } catch (error) {
            ctx.body = error;
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

