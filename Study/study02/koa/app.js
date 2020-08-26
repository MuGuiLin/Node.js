const Koa = require('koa');

const App = new Koa();

App.listen(3000, () => {
    console.log('OK 监听3000端口！');
});