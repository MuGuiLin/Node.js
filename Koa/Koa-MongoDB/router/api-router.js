const path = require('path');
const KoaRouter = require('koa-router')();

// const ivewRouter = require('./view-router');

const db = require('../models/db.js');

const Api = '/api';

module.exports = KoaRouter
    // .all('*', async (ctx, next) => {
    //     ctx.set("Access-Control-Allow-Origin", "*");
    //     console.log(666);
    //     await next();

    //     //路由重定向
    //     // router.redirect('/login');
    // })

    // 登录接口
    .get(Api + '/login', async (ctx, next) => {
        ctx.body = '登录接口';
    })

    .get(Api + '/select', async (ctx, next) => {
        // ctx.body = ('666')

        ctx.body = await db.find('users', {});
    })

    // 参数获取 localhost:3000/info?di=666
    .get(Api + '/info', async (ctx, next) => {
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
    .get(Api + '/package/:aid/:bid/:cid', async (ctx, next) => {
        console.log('接收到的参数：', ctx.params);

        ctx.body = ctx.params;
    })

    .post(Api + '/addUser', async (ctx, next) => {
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
            // KoaRouter.redirect('/addUser');
        }
        ctx.body = result;
    })

    .post(Api + '/update', async (ctx, next) => {
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





    /*--------------- 页面视图 ---------------*/

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
        const data = {
            name: '沐枫',
            list: ['HTML5', 'CSS3', 'ES6', 'Node.js', 'Vue', 'React', 'Angular']
        }
        await ctx.render('about', data);
    })

    // 用户列表
    .get('/users', async (ctx, next) => {
        const data = {
            list: await db.find('users', {})
        }
        console.log(data);
        await ctx.render('users', data);
    })

    // 新增用户
    .get('/addUser', async (ctx, next) => {
        await ctx.render('addUser');
    })

    // 编辑用户
    .get('/editUser/:id', async (ctx, next) => {
        const { id } = ctx.params;
        const data =   await db.find('users', { username: id })
        console.log(data[0]);
        await ctx.render('editUser', data[0]);
    })

