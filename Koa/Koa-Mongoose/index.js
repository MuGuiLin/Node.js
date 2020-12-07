const Koa = require('koa'),
    path = require('path'),
    KoaBody = require('koa-body'),
    KoaStatic = require('koa-static'),
    KoaRender = require('koa-art-template'),

    router = require('koa-router')(),
    config = require('./config/index'),

    api = require('./routers/api'),
    view = require('./routers/view'),
    admin = require('./routers/admin');


const server = new Koa();


// HTML模板引擎配置
KoaRender(server, ({
    root: config.template.root,
    extname: '.html', //.art
    debug: process.env.NODE_ENV !== 'production'
}));

; (async () => {


    router
        // 配置子路由(层级路由) page视图模块
        .use('', view.routes())

        // 配置子路由(层级路由) page视图 后台管理模块
        .use('/admin', admin.routes())

        // 配置子路由(层级路由) api模块（该模块在向外暴露时就启动了，所以这里就不用再启动路由了）
        .use('/api', api)



    server
        // koa 应用级中间件，在匹配路由之前，做的一系列操作
        .use(async (ctx, next) => {
            // console.log('我是中间件，我匹配所有路由！可监听所有路由入口【在进入路由之前会先走这里过】');
            console.log(new Date().toString());
            await next();

            // 当没有匹配到路由时 的错误处理
            if (404 === ctx.status) {
                // ctx.body = '404';
                ctx.render('404');
            } else {
                console.log(ctx.url);
            }

            /**
             * Koa执行流程 => 洋葱模型
             *            Request 请求时从外向里！
             *            Response 响应时从里向外！
             */
        })

        // 注册接收post参数、上传二进制文件等模块
        .use(KoaBody({
            multipart: true,                    // 开启上传二进制文件处理
            encoding: 'gzip',
            formidable: {
                maxFields: 100,                 // 上传最大文件个数（整数）
                maxFieldsSize: 2 * 1024 * 1024,              // 上传最大文件大小（整数） 1MB = (1 * 1024 * 1024)
                uploadDir: config.storage.dir,  // 文件上传目录,默认os.tmpDir(), path.join(__dirname, 'uploads')
                keepExtensions: true,           // 开启文件写入uploadDir包括原始文件的扩展名, 默认false
                hash: 'md5',                    // 如果你想计算校验和传入的文件, 设置这个要么'sha1'或'md5'、默认false
                multiples: true,                // 开启多文件上传
                onFileBegin: (name, file) => {  //文件上传前的设置
                    // console.log(name, file);
                }
            }
        }))

        // 注册静态资源代理
        .use(KoaStatic(config.storage.static))
        // .use(KoaStatic({
        //     dir: config.storage.static,         // 静态资源存储路径 path.join(__dirname, '/static')
        //     prefix: '/',                        // 静态资源访问前缀(名字自定义，前面一定要加/)
        //     gzip: true,                         // 是否启用压缩
        //     dynamic: true                       // 是否启用缓存 
        // }))

        // 注册并启动路由
        .use(router.routes())
        // 请求出错时的处理逻辑
        .use(router.allowedMethods())

        // 启动监听
        .listen(config.server.port, config.server.host, () => {
            console.log(`\n*** 服务端启动成功 --> http://${config.server.host}:${config.server.port}`);
        });

})();