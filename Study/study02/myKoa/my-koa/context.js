
/**
 * koa context
 * 源码地址：https://github.com/koajs/koa/blob/master/lib/context.js
 */

/**
 * ctx 上下文对象
 * 通过 getter 和 setter 函数简化对象的获取和更新
 */
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