// 引入依赖
const koa = require("koa");


// 初始化koa
const app = new koa();

var server = require("http").createServer(app.callback());
const io = require("socket.io")(server, { cors: true });

// 引入路由配置文件，这个在下面说明
// const routers = require("./routes/routers");



// 路由
// app.use(routers.routes());


// socket.io
io.of("mupiao").on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    setInterval(function () {
        socket.broadcast.emit("respond", {
            user: '🏡系统',
            content: `😥进入了聊天室！`
        });
    }, 1000);

    socket.on("data", (msg) => {
        console.log("echo from client: ", msg);
        socket.emit("respond", {
            user: '🏡系统',
            content: msg.msg
        });
    });
});

// 程序启动监听的端口
const port = 3001;

server.listen(port);
console.log("Listening on " + port);