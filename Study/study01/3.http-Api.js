const http = require('http');
const response = require('koa/lib/response');

// 创建 http请求服务
const server = http.createServer((request, response) => {

    // 查看request 和 response 这个对象
    console.log('请求request：', getObjPrototype(request));
    console.log('响应response：', getObjPrototype(response));

    response.end('<h1>Hello World -> 你好，世界!</h1>');
});

// 打印原型链
function getObjPrototype(obj) {
    let arr = [];
    // getPrototypeOf() 会像拔洋葱一样的一级一级向里面查找原型，赋给obj 然后又...，至到找不到为止。
    while (obj = Object.getPrototypeOf(obj)) {
        arr.push(obj);
    }
    // 返回给定对象的原型。如果没有继承属性，则返回 null 。
    return arr;
}

// 启动 监听服务器端口
// server.listen(3000, '127.0.0.1');
server.listen(3000, () => {
    console.log('监听3000端口！');
});

// “信、达、雅” 它是由我国清末新兴启蒙思想家严复提出的，他在《天演论》中的“译例言”讲到：“译事三难：信、达、雅。求其信，已大难矣！顾信矣，不达，虽译，犹不译也，则达尚焉。”