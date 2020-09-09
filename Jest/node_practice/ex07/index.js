const fs = require('fs');

module.exports.createLoader = config => {

    // 根据传进来的路径，遍历装载对应的js文件，将取到的文件内容回调返回。
    const loader = (scanFolder, cb) => {
        const files = fs.readdirSync(scanFolder);
        files.forEach(filename => {
            filename = filename.replace(".js", "");
            const file = require(scanFolder + "/" + filename);
            cb(filename, file);
        });
    };

    // 暗号：分治算法

    return {
        // 返回初始回载方法
        initFunction: scanFolder => {
            const ret = {};
            console.log('文件路径：', scanFolder);

            // 调用loader函数得到文件内容，将其拼接成对象返回，供测试时调用。
            loader(scanFolder, function (name, file) {

                ret[name] = file(config);
                console.log('\n name：', name, '\n file：', file, '\n config：', config);
            });
            return ret;
        }
    };
};

