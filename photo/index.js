const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const ejs = require('ejs');

let getMimeType = function (par, callback) {
    fs.readFile('./static/json/mime.json', (err, josn) => {
        if (err) {
            throw Error('没有找到 MIME.json文件！');
        } else {
            let data = JSON.parse(josn);
            let mime = data[par] || `text/plain`;

            //执行回调函数，并把得到的mime类型传过去
            callback(mime);
        }
    });
};

const server = http.createServer((req, res) => {
    if ('/favicon.ico' == req.url) {
        return false;
    }

    //获取用户路径
    let pathName = url.parse(req.url).pathname;
    //console.log(pathName); //所有请求的路径

    //当路径为 / 时，默认认识开首页
    pathName = (-1 == pathName.indexOf('.')) ? 'page/index.html' : pathName;
    // pathName = ('/' == req.ur) ? 'page/index.html' : pathName;

    let fileSrc = `./static/${ path.normalize(pathName)}`;

    //获取扩展名：即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
    let extname = path.extname(pathName);

    fs.readFile(fileSrc, (err, data) => {
        if (err) {
            fs.readFile(`./static/page/404.html`, (err, data) => {
                res.writeHead('200', {
                    'Content-Type': 'text/thml; CharSet=UTF-8;'
                });
                res.end(data);
            });
        } else {
            //获取，并回调执行 mime类型
            getMimeType(extname, (mime) => {
                res.writeHead('200', {
                    'Content-Type': mime + '; CharSet=UTF-8;'
                });
                switch (req.url) {
                    case '/':
                        var jsonObj = { fname: [] };

                        fs.readdirSync('./upload').forEach((e, i) => {
                            jsonObj.fname.push(e);
                        });

                        res.end(ejs.render(data.toString(), jsonObj));
                        break;

                    case '/info':
                        fs.readFile('./static/page/info.html', (err, data) => {
    
                            var jsonObj = { imgArr: [] };

                            fs.readdirSync('./upload/default').forEach((e, i) => {

                                jsonObj.imgArr.push('./upload/default/'+ e);
                            });

                            res.end(ejs.render(data.toString(), jsonObj));
                        });
                        break;

                    case '/admin':
                        fs.readFile('./static/page/upload.html', (err, data) => {
                            res.end(data);
                        });
                        break;

                    case '/upload':
                        if (req.method.toLowerCase() == 'post') {

                            let form = new formidable.IncomingForm();

                            form.uploadDir = "./upload";

                            form.parse(req, function (err, fields, files) {

                                var dirName = fields.name || 'default';

                                if (dirName) {
                                    fs.mkdir('./upload/' + dirName, (err) => {
                                        if (!err) {
                                            console.log(dirName, `目录创建成功！`);
                                        }
                                    });
                                }

                                var oldpath = files.photo.path;

                                var newpath = `./upload/${dirName}/` + files.photo.name;

                                fs.rename(oldpath, newpath, (err) => {
                                    if (err) {
                                        throw Error('上传文件重命名失败！');
                                    } else {
                                        res.end('OK 上传成功！');
                                    }
                                });
                            });
                        } else {
                            res.end('上传失败，请用POST方式上传！');
                        }

                        break;
                    default:
                        res.end(data);
                }
               
            });
        }
    });

});

server.listen('666', '127.0.0.6');