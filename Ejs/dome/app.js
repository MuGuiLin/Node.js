const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

let json = {
    mymb: 'EJS',
    url: 'https://www.npmjs.com/package/ejs',
    koaEjs: 'https://www.npmjs.com/package/koa-ejs'
}

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; CharSet=UTF-8'});

    fs.readFile('./page/index.ejs', (err, data) => {
        if(err) {
            throw Error('找不到这个模板！');
        } else {
            res.end(ejs.render(data.toString(), json));
        }

    });

}).listen('1000', '127.0.0.1');