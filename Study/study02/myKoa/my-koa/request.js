
/**
 * koa request
 * 源码地址：https://github.com/koajs/koa/blob/master/lib/request.js
 */

module.exports = {
    // 获取 url
    get url() {
        // 在运行时自动挂载（所以现在这里没有this.req.url）
        return this.req.url;
    },

    // 获取method
    get method() {
        return this.req.method.toLowerCase();
    }
};