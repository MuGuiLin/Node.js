const http = require('http');

/**
 * 自定义实现Koa 
 * Koa 源码地址：https://github.com/koajs/koa/tree/master/lib
 * https://github.com/koajs/koa/blob/master/lib/application.js
 */


const context = require('./context');
const request = require('./request');
const response = require('./response');


class MyKoa {

    constructor() {

    };

    // 创建上下文对象 -> ctx 【就是让ctx对象中有req、res、body】
    createContext(req, res) {
        // 创建ctx上下文对象，并继承

        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
     
        // 挂载 request 和 response
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        console.log('---ctx---', ctx);
        return ctx;
    };

    use(callback) {
        // 保存中间件回调，【其实中间件，就是函数的组合， https://juejin.im/post/6844903986957402126】
        this.callback = callback;
    };

    listen(...args) {
        // 创建http服务
        const server = http.createServer((request, response) => {
            // 得到上下文对象 ctx
            const ctx = this.createContext(request, response);

            // this.callback(request, response);
            this.callback(ctx);

            // 响应返回
            response.end(ctx.body);
        });

        // 根据传入的参数 启动监听
        server.listen(...args);
    };

};

module.exports = MyKoa;