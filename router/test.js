const http = require('http');
const url = require('url');

http.createServer( (req, res) => {
    res.writeHead('200', {'Content-Type': 'text/html; charSet=UTF-8'});
    let userUrl = req.url;
    if ('/sutuden/' == userUrl.substr(0, 9)) {
        let sid = userUrl.substr(9);
        //学生学号在：/sutuden/后的10位数
        if(/^\d{10}$/.test(sid)) {
            res.end('您要查询的学生ID为：'+ sid);
        } else {
            res.end('学生学号ID位数不正确【10位】！');
        }

    } else if ('/teachar/' == userUrl.substr(0, 9)) {
        let tid = userUrl.substr(9);

        //老师工号在：/teachar/后的6位数
        if(/^\d{6}$/.test(tid)){
            res.end('您要查询的老师ID为：' + tid);
        } else {
            res.end('老师工号位数不正确【6位】！');
        }

    } else {
        res.end('对不起：没有找到相关数据！');
    };
    
}).listen('2000', '127.0.0.1');