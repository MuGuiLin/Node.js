const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {

    const { url, method } = request;

    // 定义路由
    if ('/' === url && 'GET' === method) {
        // 返回页面
        fs.readFile('./pages/index.html', (err, data) => {
            if (err) {
                readFileError(err, response)
            } else {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.end(data);
            }
        })
    } else if ('/about' === url && 'GET' === method) {
        // 返回页面
        fs.readFile('./pages/about.html', (err, data) => {
            if (err) {
                readFileError(err, response)
            } else {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.end(data);
            }
        })
    } else if ('/news' === url && 'GET' === method) {
        // 返回页面
        fs.readFile('./pages/news.html', (err, data) => {
            if (err) {
                readFileError(err, response)
            } else {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.end(data);
            }
        })
    } else if ('/user' === url && 'GET' === method) {
        // 返回 GET请求数据 API接口
        response.writeHead(200, { 'Content-Type': 'application/json' });
        const data = {
            name: '沐枫',
            age: 28,
            job: 'Web全栈开发工程师',
            hobby: ['打球', '上网', '听音乐'],
            hook: {
                name: 'HTML5全威指南'
            }
        };
        response.end(JSON.stringify(data));

    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end('<h1>404 没有找到该页面！</h1>');
    }

});

function readFileError(err, res) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 - Not Page');
}

server.listen(3001, () => {
    console.log('静态请求服务：3001端口');
});