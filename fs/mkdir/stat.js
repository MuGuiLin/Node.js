const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if ('/favicon.ico' == req.url) {
        //因为node会单独去请求一次favicon.ico图标，所以就会出现两次请求，
        //这样做是为了减少一次请求
        return false;
    }

    res.writeHead('200', {
        'Content-Type': 'text/txt; charset=UTF-8'
    });

    //检测路径的相关属性
    fs.stat('./相册', (error, stats) => {

        console.log('检测这个路径是不是一个块设备：', stats.isBlockDevice());
        console.log('检测这个路径是不是一个字符设备：', stats.isCharacterDevice());
        console.log('检测这个路径是不是一个文件夹：', stats.isDirectory());
        console.log('检测这个路径是不是一个普通文件：', stats.isFile());
        console.log('检测这个路径是不是一个socket：', stats.isSocket());
        newFunction(res, stats);
        
    });


}).listen('5000', '127.0.0.1');

function newFunction(res, stat) {
    res.end(stats);
}

