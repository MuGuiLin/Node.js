const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer( (req, res) => {

    //推荐 url.parse(req.url, true) 当第2个参数为true时 相当于下的querystring用法，

    let queryObj = url.parse(req.url, true).query;

    var name = queryObj.name;
    var age = queryObj.age;
    var sex = queryObj.sex;
    var like = queryObj.like;


    //不推荐 querystring.parse(queryObj)
    // let queryObj = url.parse(req.url).query;

    // let querystringObj = querystring.parse(queryObj)

    // var name = querystringObj.name;
    // var age = querystringObj.age;
    // var sex = querystringObj.sex;
    // var like = querystringObj.like;


    res.writeHead('200', { 'Content-Type': 'text/html; charset=UTF-8'});
    res.end(`收到的数据：<br>姓名：${name}<br>年龄：${age}<br>性别：${sex}<br>爱好：${like}`);

    //注：res.end(); 以下的代码就不会运行了
    
    switch (req.url) {
        case '/index':
            fs.readFile('../page/home.html', (err, data) => {
                res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                res.end(data);
            });
            break;
        
        case '/jpg':
            fs.readFile('../img/img.jpg', (err, data) => {
                res.writeHead('200', {
                    'content-type': 'image/jpg;'
                });
                res.end(data);
            });
            break;
        
        case '/list':
            fs.readFile('../page/list.html', (err, data) => {
                res.writeHead('200', {
                    'content-type': 'text/html; charset=utf-8'
                });
                res.end(data);
            });
            break;
    
        default:
            res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
            res.end("小乌龟迷路啦！");
            break;
    }
    
});

server.listen('3000', '127.1.1.1');