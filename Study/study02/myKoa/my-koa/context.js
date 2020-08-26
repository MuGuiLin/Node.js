
/**
 * koa context
 * 源码地址：https://github.com/koajs/koa/blob/master/lib/context.js
 */

// 通过 getter 和 setter 函数简化
module.exports = {
    get url() {
        return this.request.url;
    },

    get method() {
        return this.request.method;
    },

    set body(val) {
        this.response.body = val;
    },

    get body() {
        return this.response.body;
    }
};