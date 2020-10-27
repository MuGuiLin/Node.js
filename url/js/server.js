const http = require('http');
const url = require('url');

const server = http.createServer( (req, res)=> {
    res.writeHead('200', {'Content-Type': 'text/html; charset=UTF-8'});
    console.log(req.url);
    //url.parse() 模型方法可以得到 req.url中的各种属性，如：域名，端口号，传的值，锚点等。
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query; //true 表示转为json对象
    let name = query.name;
    let path = url.parse(req.url).path;
    let href = url.parse(req.url).href;
    let hash = url.parse(req.url).hash;
    res.write('<h1>' + name + '</h1>');
    res.write('<img src="../img/URL.jpg">');

    console.log(
        'pathname:',pathname,
        'query:', query,
        'path:', path,
        'href:', href,
        'hash:', hash
    )
    res.end('pathname:' + pathname + '</br>query id:' + query.id + '</br>hash:' + hash + '</br>path:' + path + '</br>href:' + href, 'string', function (back) {
       console.log('host-----------', url.parse(req.url).host)
    });
    
});

//http://127.1.1.1:3000/list.html?id=56&name=穆贵林#two

server.listen('3000', '127.1.1.1');