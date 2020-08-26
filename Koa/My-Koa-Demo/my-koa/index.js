const http = require('http');

class MyKoa {

    constructor() {

    };

    use(callback) {
        // 保存中间件回调
        this.callback = callback;
    };

    listen(...args) {
        // 创建http服务
        const server = http.createServer((request, response) => {
            this.callback(request, response);
        });

        // 根据传入的参数 启动监听
        server.listen(...args);
    };

};

module.exports = MyKoa;