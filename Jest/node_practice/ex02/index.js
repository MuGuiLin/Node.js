
const compose = function (middlewares) {
    // 暗号：排序
    return function () {
        // 启动调用dispatch(0) 
        return dispatch(0);

        function dispatch(i) {
            // 获取并存储当前要被执行的函数
            let fun = middlewares[i];
            // 如果要被执行的函数时
            if (!fun) {
                // 直接返回空承诺
                return Promise.resolve();
            };

            return Promise.resolve(
                // 执行调用
                fun(function next() {
                    // 递归调用下一个fun，所以要i+1;
                    return dispatch(i + 1);
                })
            );
        };
    };
};

module.exports = { compose };