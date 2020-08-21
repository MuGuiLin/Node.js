/**
 * 打开浏览器
 */

const open = require('open');

/**
 * 封装open模块
 * @param {*} url 
 */
module.exports.open = async (url) => {

    // 打开浏览器
    open(url);
};