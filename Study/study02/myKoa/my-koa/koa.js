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
        this.middleares = [];
    };

    /**
     * 创建上下文对象 -> ctx 【就是让ctx对象中有req、res、body】
     * @param {*} req 
     * @param {*} res 
     */
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

    // 由于可能有多个use出现，所以这样方式不能用了！
    // use(callback) {
    //     // 保存中间件回调，【其实中间件，就是函数的组合， https://juejin.im/post/6844903986957402126】
    //     this.callback = callback;
    // };

    /**
     * use 中间件
     * @param {*} middleares 
     */
    use(middleares) {
        // 保存use 中间件（回调函数），每use一次就添加保存一次
        this.middleares.push(middleares);
    }
    /**
     * 创建、监听服务
     * @param  {...any} args 
     */
    listen(...args) {
        // 创建http服务
        const server = http.createServer( async (request, response) => {
            // 得到上下文对象 ctx
            const ctx = this.createContext(request, response);

            // this.callback(request, response);
            // this.callback(ctx);

            // 合成并执行use 中间件
            this.compose(this.middleares)(ctx);

            // response.writeHead('Context-Type', 'text/html')
        
            // 响应返回
            response.end(ctx.body);
        });

        // 根据传入的参数 启动监听
        server.listen(...args);
    };

    /**
     * 组合函数（洋葱圈组合函数 - 责任链模式）
     * @param {Array} middleares 
     */
    compose(middleares) {
        // 返回一个新函数
        return function (ctx) {
            // 返回并执行函数的承诺
            return dispatch(0); // 从第一个开始

            function dispatch(i) {
                // 获取每个要执行的异步函数
                let fn = middleares[i];
                if (!fn) {
                    // 如果没有获取到，就返回一个空承诺
                    return Promise.resolve()
                } else {
                    // 如果获取到了，就返回并执行承诺
                    return Promise.resolve(
                        // 执行并返回next函数
                        fn(ctx, function next() {
                            // 递归调用
                            return dispatch(i + 1);
                        })
                    );
                };
            };
        };
    };

};

module.exports = MyKoa;