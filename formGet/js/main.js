const http = require('http');
const url = require('url');

http.createServer((req, res)=>{
    res.writeHead('200', {'Content-Type': 'text/html; charSet=UTF-8;'});

    var query = url.parse(req.url, true).query;
    if (query.teachar){
        res.write('老师：ID' + query.number1 + '<br>');
    }
    if (query.student) {
        res.write('学生：ID' + query.number2 + '<br>');
    }
    res.end('OK');
}).listen('1000', '127.0.0.1');