const Koa = require('koa')
const IO = require('koa-socket-2')

const app = new Koa()
const io = new IO()



const chatUser = [];
let chatName = '';

io.attach(app);



// // 监听客户端连接 每个client对应一个开着的浏览器窗口
io.on('connection', (io) => {
    console.log(io);
    console.log('--------------------------------------------------------连接上了，心跳开始！');
    // 捕获客户端自定义信息
    io.on('login', (msg) => {
        if (chatUser.indexOf(msg.user) > -1) {
            io.emit('respond', {
                user: '🏡系统',
                content: `😥对不起：${msg.user}昵称已存在！`
            });

        } else {
            chatName = msg.user;
            // 统计连接数
            chatUser.push(msg.user);

            // 私发：发送给自己 在线人数 
            io.emit('users', {
                users: chatUser
            });

            // 私发：发送给自己 消息
            io.emit('respond', {
                user: '🏡系统',
                content: `🔊嗨：${msg.user} 欢迎你进入聊天室！`
            });

            // 广播：发送给所有人 在线人数
            io.broadcast.emit('users', {
                users: chatUser
            });

            // 广播：发送给所有人 消息
            io.broadcast.emit('respond', {
                user: '🏡系统',
                content: `👏欢迎${msg.user}进入了聊天室！`
            });

            // https://www.17sucai.com/preview/1750631/2019-06-28/lt/index.html
            // http://www.uimaker.com/uimakerhtml/uidesign/uisoft/2018/1029/131326.html

            // https://blog.csdn.net/qq_35014708/article/details/88533874
            // https://www.npmjs.com/package/koa-socket-2
            // io.join('some_room');
            // io.leave( 'some_room' );
            // io.broadcast.to('some_room').emit( 'message', { hello: 'world' } );
            // io.volatile.emit( 'message', { hello: 'world' } );
            // io.compress(true).emit( 'message', { hello: 'world' } );
        }
    })

    // 捕获客户端send信息
    io.on('message', (msg) => {
        const message = {
            user: msg.user,
            content: msg.content || '666'
        }

        // 私发：发送给自己 消息
        io.emit('respond', message);

        // 广播：发送给所有人 消息
        io.broadcast.emit('respond', message);
    });

    // 监听客户端断开连接
    io.on('disconnect', (msg) => {
        chatUser.splice(chatUser.indexOf(chatName), 1);

        // 广播：发送给所有人 在线人数
        io.broadcast.emit('users', {
            users: chatUser
        });

        // 广播：发送给所有人 消息
        io.broadcast.emit('respond', {
            user: '🏡系统',
            content: `😥${chatName}离开了聊天室！`
        });
    });
});

// 监听socket请求
io.use(async (ctx, next) => {
    console.log('**********************************', ctx)



    let start = new Date();
    console.log(`\n\n----------------------> Socket.Io 心跳开始：${start}ms`);
    await next();
    console.log(`\n\n----------------------> Socket.Io 心跳： ${new Date() - start}ms`);
});




app.listen(666);