/**
 * Node.js中的 crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
 */
const crypto = require('crypto');

module.exports.createToken = (token) => {
    // 把token字符串在.的位置分隔成数组
    const ary = token.split('.');

    if (3 !== ary.length) {
        return false;
        //暗号：贪心算法 （又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解，贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择。
    }

    return {
        // 获取token字符串 在经过base64解码后exp的值(是一个时间戳)
        getExp: () => {

            // 通用Node.js中的 Buffer()方法 将ary[1]中的字符串 进行base64解码，得到一个json字符串
            // const json = Buffer(ary[1], 'base64').toString();
            const json = base64Jiema(ary[1]);

            console.log('Buffer()解码后的json字符串：', json, '\n转为json对象：\n', JSON.parse(json));
            
            // 把得到的json字符串 转为json对象，并获取json对象中exp的属性值(时间戳) 1591933872 返回
            return JSON.parse(json).exp;
        },

        verify: key => {
            const hmac = crypto.createHmac('SHA256', key).update(ary[0] + '.' + ary[1]).digest('base64');
            
            return hmac === ary[2] + '=';
        }
    };
};


/**
 * Nodejs中的 Buffer() 方法 base64编码与解码
 */

// 1､普通字符串的加解码
//编码
function base64Bianma(str) {
    return Buffer(str).toString('base64');
}
//解码
function base64Jiema(base64Str) {
    return Buffer(base64Str, 'base64').toString();
}


// 2､十六进制Hex的加解码
//编码
function hexBianma(str) {
    return Buffer(str, 'base64').toString('hex');
}
//解码
function hexJiema(base64Str) {
    return Buffer(base64Str, 'hex').toString('utf8');
}


//3､base64图片的加解码
const fs = require('fs');

//编码
function base64Encode(file) {
    let bitmap = fs.readFileSync(file);
    return Buffer(bitmap).toString('base64');
};

//解码
function base64Decode(base64str, file) {
    var bitmap = Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
};

