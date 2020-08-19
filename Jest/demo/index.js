// 字符串变量
const msg = '你好，世界';

// 求和函数
function sum(...num) {

    return num[0] + num[1];
};

// 导出
module.exports = { msg, sum };