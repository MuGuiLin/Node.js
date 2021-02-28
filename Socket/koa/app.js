const Koa = require('koa')
const IO = require('koa-socket')

const app = new Koa()
const io = new IO({ cors: true })




io.attach(app, { cors: true })

io.on('connection', (context) => {
    console.log('-------------> 连接上了，心跳开始！');
})

// 接收消息
io.on('sendMsg', function (context) {
    console.log('sendMsg', context.data)

    // 向客服端实时广播，所有人消息
    io.broadcast('message', context.data);
    io.broadcast('respond', context.data.msg);
});

// 接收消息
io.on('message', function (context) {
    console.log('message', context.data)

    // 向客服端实时广播，所有人消息
    io.broadcast('message', context.data);
    io.broadcast('respond', context.data.msg);
});

// 处理登陆同步信息
io.on('login', context => {
    let id = context.data.id;
    console.log('登陆信息', context);
});


app.listen(888);