
module.exports.brackets = (target, property) => {
    const old = target.prototype[property];

    target.prototype[property] = msg => {
        msg = `[${msg}]`;
        return old(msg);
    };
};

/**
 * 装饰器工厂 -> 高阶函数
 * @param {String} name 
 */
module.exports.sender = (name) => (target, property) => {

    // 暗号：回溯算法

    // 保存在调用时传过来的 Log类 的 print方法
    const oldPrint = target.prototype[property];

    // 改写传过来的 Log类 的 print方法
    target.prototype[property] = (msg) => {

        // 拼接name参数 和 msg参数
        msg = `${name} : ${msg}`;

        // 调用之前保存的print方法
        return oldPrint(msg);
    };
};
