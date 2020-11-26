const Koa = require('koa'),
    path = require('path'),
    KoaBody = require('koa-body'),
    KoaStatic = require('koa-static'),
    KoaRouter = require('koa-router'),
    KoaRender = require('koa-art-template');

// const router = require('koa-router')(); //引入并实例化

const server = new Koa(),
    router = new KoaRouter();

// HTML模板引擎配置
KoaRender(server, ({
    root: path.join(__dirname, 'views'),
    extname: '.html', //.art
    debug: process.env.NODE_ENV !== 'production'
}));

(async () => {
    ; router
        .get('/', async (ctx, next) => {

            console.log(path.join(__dirname, 'uploads'));console.log(path.resolve(__dirname, '/uploads'));

            const data = {
                name: '沐枫',
                list: ['HTML5', 'CSS3', 'ES6', 'Node.js', 'Vue', 'React', 'Angular']
            }
            // 渲染index.html
            await ctx.render('index', data);   
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


        // .all('*', async (ctx, next) => {
        //     ctx.set("Access-Control-Allow-Origin", "*");

        //     // await next();

        //     //路由重定向
        //     router.redirect('/login');
        // });


    ; server
        // koa 应用级中间件，在匹配路由之前，做的一系列操作
        .use(async (ctx, next) => {
            // console.log('我是中间件，我匹配所有路由！可监听所有路由入口【在进入路由之前会先走这里过】');
            console.log(new Date().toString());
            await next();

            // 当没有匹配到路由时 的错误处理
            if (404 === ctx.status) {
                ctx.body = '404'
            } else {
                console.log(ctx.url);
            }

            /**
             * Koa执行流程 => 洋葱模型
             *              Request 请求时从外向里！
             *              Response 响应时从里向外！
             */
        })

        // 注册接收post参数、上传二进制文件等模块
        .use(KoaBody({
            multipart: true,                    // 开启上传二进制文件处理
            encoding: 'gzip',
            formidable: {
                maxFields: 100,                 // 上传最大文件个数（整数）
                maxFieldsSize: 2 * 1024 * 1024,              // 上传最大文件大小（整数） 1MB = (1 * 1024 * 1024)
                uploadDir: path.join(__dirname, 'uploads'),  // 文件上传目录,默认os.tmpDir(),
                keepExtensions: true,           // 开启文件写入uploadDir包括原始文件的扩展名, 默认false
                hash: 'md5',                    // 如果你想计算校验和传入的文件, 设置这个要么'sha1'或'md5'、默认false
                multiples: true,                // 开启多文件上传
                onFileBegin: (name, file) => {   //文件上传前的设置
                    // console.log(name, file);
                }
            }
        }))

        // 注册静态资源代理
        .use(KoaStatic(__dirname + '/public'))
        // .use(KoaStatic({
        //     dir: path.join(__dirname, '/static'),   // 静态资源存储路径
        //     prefix: '/',                            // 静态资源访问前缀(名字自定义，前面一定要加/)
        //     gzip: true,                             // 是否启用压缩
        //     dynamic: true                           // 是否启用缓存 
        // }))

        // 注册并启动路由
        .use(router.routes())
        // 请求出错时的处理逻辑
        .use(router.allowedMethods())

        // 启动监听
        .listen(3000, '127.0.0.1', () => {
            console.log('3000端口已启动！');
        });
})();

// ES7 async await
const getData = async () => {
    return '123456';
};

// ES6 Promise
const getData2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('admin');
        }, 1000);
    })

};

async function run() {
    let data = await getData();
    let data2 = await getData2();
    console.log(data, data2);
    return data
}

console.log(run());