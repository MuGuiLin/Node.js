const Koa = require('koa');

const App = new Koa();

App.use((ctx, next) => {

    ctx.body = {
        status: 200,
        message: 'OK，666'
    }
});

App.listen(3000, () => {
    console.log('OK 监听3000端口！');
});