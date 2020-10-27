const http = require("http");
const url = require('url');
const fs = require('fs');
const path = require('path');

const newLocal = '127.0.0.2';

let getMimeType = function(par) {
    fs.readFile('./web/json/mime.json', (err, data) => {
        console.log(data[par]);
        return data[par];
    });
    switch (par) {
        case '.js':
            return 'Text/js;';
            break;
        case '.css':
            return 'Text/css;';
            break;
        case '.txt':
            return 'Text/txt;';
            break;
        case '.jpg':
            return 'image/jpeg;';
            break;
    
        default:
            return 'Text/html;';
            break;
    }
};

http.createServer( (req, res)=> {

    if('/favicon.ico' == req.url) {
        return false;
    }
  
    //获取用户路径
    let pathName = url.parse(req.url).pathname;

    //当路径为 / 时，默认认识开首页
    pathName = ('/' == pathName) ? 'page/index.html' : pathName;

    //获取扩展名：即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
    let extname = path.extname(pathName);

    //判断mime类型
    let mime = getMimeType(extname);
                                           //MIME类型
    res.writeHead('200', { 'Content-Type': mime +' CharSet=UTF-8;'});
    
    fs.readFile(`./web/${pathName}`, (err, data) => {
        if(err) {
            fs.readFile(`./web/page/404.html`, (err, data) => {
                res.end(data);
            });
        } else {
            res.end(data);
        }
    });

}).listen('8080', newLocal);