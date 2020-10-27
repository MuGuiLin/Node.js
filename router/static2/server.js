const http = require("http");
const url = require('url');
const fs = require('fs');
const path = require('path');

let getMimeType = function(par, callback) {
    fs.readFile('./web/json/mime.json', (err, josn) => {
        if(err) {
            throw Error('没有找到 MIME.json文件！');
        } else { 
            let data = JSON.parse(josn);
            let mime = data[par] || `text/plain;`;
            
            //执行回调函数，并把得到的mime类型传过去
            callback(mime);
        }
    });
};

http.createServer( (req, res)=> {

    if('/favicon.ico' == req.url) {
        return false;
    }

    //获取用户路径
    let pathName = url.parse(req.url).pathname;
    //console.log(pathName); //所有请求的路径

    //当路径为 / 时，默认认识开首页
    pathName = (-1 == pathName.indexOf('.')) ? 'page/index.html': pathName;

    let fileSrc = `./web/${ path.normalize(pathName)}`;

    //获取扩展名：即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
    let extname = path.extname(pathName);

    fs.readFile(fileSrc, (err, data) => {
        if(err) {
            fs.readFile(`./web/page/404.html`, (err, data) => {
                res.writeHead('200', { 'Content-Type': 'text/thml; CharSet=UTF-8;'});
                res.end(data);
            });
        } else {
            //获取，并回调执行 mime类型
            getMimeType(extname, (mime) => {
                res.writeHead('200', { 'Content-Type': mime +' CharSet=UTF-8;'});
                res.end(data);
            });
        }
    });

}).listen('8080', '127.0.0.8');