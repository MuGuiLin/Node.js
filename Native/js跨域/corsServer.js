const http = require('http');

http.createServer((req, res) => {
    res.setHeader();
    res.writeHead(200, {'Content-Type': 'text/plain'});

    let post = '';
    req.on('data', (par) => {
        post += par;
    });

    req.on('end', () => {
        post = queryString.parse(post);
        res.write('请求类型：', post.method);
        res.end();
    });
}).listen('3000', '127.0.0.1');