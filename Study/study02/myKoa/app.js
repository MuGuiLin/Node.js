const Koa = require('./my-koa/koa');

const App = new Koa();

App.listen(3001, () => {
    console.log('OK 监听3001端口！');
});