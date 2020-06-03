'use strict';

//通过require将http库包含到程序中
const http = require('http');
//引入url模块解析url字符串
const url = require('url');
//引入querystring模块处理query字符串
const querystring = require('querystring');


//创建新的HTTP服务器
const server = http.createServer();

//通过request事件来响应request请求
server.on('request', function (req, res) {
    const urlPath = url.parse(req.url).pathname;
    const qs = querystring.parse(req.url.split('?')[1]);

    if (urlPath === '/jsonp' && qs.callback) {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        let data = {
            name: '沐枫',
            age: 28,
            sex: '男',
            job: 'Web全栈开发'
        };

        data = JSON.stringify(data);
        let callback = qs.callback + '(' + data + ');';
        res.end(callback);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('Hell World\n');
    }
});

// 监听服务器端口
server.listen('3000', '127.0.0.1', () => {
    console.log('127.0.0.1:3000已启动')
});

//用于提示我们服务器启动成功
console.log('Server running!');