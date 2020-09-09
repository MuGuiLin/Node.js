
const http = require('http');

const server = http.createServer((request, response) => {

    // 故意制造一个错误 asdf() 有20%的机率会报错
    Math.random() > 0.8 ? asdf() : Math.random();

    response.end('Hello 666!');
});

if(!module.parent) {
    server.listen(3000, () => {
        console.log('没有父模块，现已启动3000端口！');
    });
} else {
    module.exports = server;
}
