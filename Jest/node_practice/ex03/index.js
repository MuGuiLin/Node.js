const fs = require('fs');

/**
 * 获取json文件中的数据
 * 返回一个Promise对象  成功后：返回JSON对象
 * @param {string} path json文件路径
 */

module.exports.parser = path => {

    // http://nodejs.cn/api/fs/fs_createreadstream_path_options.html 在Node中读是将内容读取到内存中，而内存就是Buffer对象!!!
    const readStream = fs.createReadStream(path);  //createReadStream() 是fs模块中读取流的一个方法，所以它读取出来的类容都是buffer类型！
    let reqData = [];
    let size = 0;

    // 暗号：二分查找
    return new Promise((resolve, reject) => {

        readStream.on('open', () => {
            console.log(`文件打开 - ${path}`);
        });

        /**
         *   监听文件读取（当有数据可读时触发），就可以将非流动模式转换为流动模式（可读流这种模式它默认情况下是非流动模式(暂停模式)，它什么也不做，就在这等着）
         *   流动模式会一直触发data事件，直到读取完毕触发end事件
         */
        readStream.on('data', (data) => {
            size++;
            reqData.push(data);
            console.log(`文件流 - Buffer，大小：${size}`, data);
        });


        // 监听文件读取出错时（在读取 或 写入文件过程中发生错误时触发）。
        readStream.on('error', function (err) {
            reject(err);
        });


        // 监听文件读取完毕时，会自动触发一次end事件（注：没有读取完成时不会触发！）
        readStream.on('end', () => {

            // 用Buffer.concat()方法，合并存储在reqData数组中的小Buffer
            let buffer = Buffer.concat(reqData);

            // 将buffer流先转为字符串，然后再转为JSON对象
            let jsonStr = JSON.parse(buffer.toString());

            // 执行成功并返加JSON对象
            resolve(jsonStr);
        });


        // readStream.on('close', () => {
        //     console.log('文件关闭！');
        // });
    });
};
