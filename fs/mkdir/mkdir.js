const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if ('/favicon.ico' == req.url) {
        //因为node会单独去请求一次favicon.ico图标，所以就会出现两次请求，
        //这样做是为了减少一次请求
        return false;
    }

    let random = parseInt(Math.random() * 89999) + 10000;
    console.log('事件环机制 欢迎：', random);

    res.writeHead('200', {
        'Content-Type': 'text/txt; charset=UTF-8'
    });

    //创建一个唯一的临时目录
    let fsObj = fs.mkdir('./' + random, (error, data) => {
        if (error) {
            throw error.code;
        } else {
            console.log(random, '事件环机制 文件夹创建完毕！');
            res.end(data);
        }
    });


}).listen('5000', '127.0.0.1');

//不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查一个文件是否存在。 作为替代， 用户代码应该直接打开 / 读取 / 写入文件， 当文件无效时再处理错误。

//如果要检查一个文件是否存在且不操作它， 推荐使用 fs.access()。