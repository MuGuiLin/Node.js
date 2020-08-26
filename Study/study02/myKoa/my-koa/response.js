/**
 * koa response
 * 源码地址：https://github.com/koajs/koa/blob/master/lib/response.js
 */

module.exports = {
    get body() {
        return this._body;
    },

    set body(val) {
        this._body = val;
    }
};