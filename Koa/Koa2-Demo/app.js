const Koa = require('koa');

const App = new Koa();

// express写法
// App.use(function(req, res){
//     var data = {
//         id: '1024',
//         title: '文章标题',
//         content: '文章内容'
//     }
//     res.send(data);
// })

// async 让方法变成异步方法

// await 等待异步方法执行完成（相当于从异步 转 同步）（ES7）

App.use(async (ctx) => {
    var data = {
        id: '1024',
        title: '文章标题',
        content: '文章内容'
    }
    ctx.body = data;
})

App.listen(3000, (e)=> {
    console.log('监听3000端口')
});