const { EventEmitter } = require('events');

module.exports = class Connection {

    // 暗号：冒泡排序

    constructor() {
        // 实例化 EventEmitter 类，它是由Node.js中的 events 模块定义和公开
        this.emmiter = new EventEmitter();
    };

    // 发布链接方法
    connection(msg) {

        // 发布事件
        this.emmiter.emit('connect', msg);
    };

    //订阅连接方法
    onConn(callback) {

        // 订阅事件，执行回调
        // this.emmiter.on('connect', async (msg) => {
        //     console.log('msg：', msg);
        //     callback(msg);
        // });

        // 订阅事件，执行回调 简写
        this.emmiter.on('connect', async (msg) => callback(msg));
    };

};
