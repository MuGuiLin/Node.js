const express = require('express');
const app = express();


//创建http服务并引用express模块
const http = require('http').Server(app);
const io = require('socket.io')(http);


//接收post提交模块
const getPost = require('body-parser');
app.use(getPost.urlencoded({
    extended: false
}));
app.use(getPost.json());


//设置session模块 
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


const router = require('./controller');


app.set('view engine', 'ejs');
app.use(express.static('./static'));


app.get('/', router.Index);

app.post('/check', router.UserCheck);

app.get('/chat', router.OpenChat);


io.on('connection', (ws) => {
    router.SocketIo(ws, io);
});


//http.listen('666', '172.28.125.171');
http.listen('666');