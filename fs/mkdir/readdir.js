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

    var folder = [];
    var file = [];

    // 读取一个目录下的所有内容（文件）。 有两个回调参数 (err, files)
    fs.readdir('./相册', (error, files) => {

        //files 是一个数组，是目录中包括（文件 和 文件夹）但是：不包括 下级文件夹里的内容

       // 如何分别提取文件，和文件夹, 【按以往的编程思路如下。。。。惜行不通，folder，file始终是[]空的，这就是Node的异步机制造成的】事件环机制
    //    for(let i = 0; i < files.length; i++) {

    //         fs.statSync(`./相册/${files[i]}`, (err, stats) => {

    //             if (stats.isDirectory()) {
    //                 folder.push(files[i]);
    //             } else {
    //                 file.push(files[i]);
    //             }
    //         });
    //    }

       //解决办法如下：
        (function getFolder(i) {
            if(i == files.length) {
                res.write(`----------------------文件夹有：${folder}-----------------------文件有：${file}`);
                res.end(`---------------------而这个文件夹目录下共有：${files}`);
                return false;
            }
            fs.stat(`./相册/${files[i]}`, (err, stats) => {

                if (stats.isDirectory()) {
                    folder.push(files[i]);
                } else {
                    file.push(files[i]);
                }
                getFolder(i + 1);
            });
        })(0);

       
        
    });

}).listen('5000', '127.0.0.1');

