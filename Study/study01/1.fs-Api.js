const fs = require('fs');

// console.dir(fs);

// 1、同步文件读取
// 返回Buffer缓冲 对象【二进制文件（由于要读取的文件类型是未知的，所以node统一以二进制形式返回）】
const data = fs.readFileSync('./fs文件系统.txt');

console.log('二进制：', data);
console.log('转换后：', data.toString());

// 2、异步I/O：回调函数式异步文件读取 回调会传入两个参数 (err, data)，其中 data 是文件的内容。
fs.readFile('./fs文件系统.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

//如果没有指定字符编码，则返回原始的 buffer, 如果 options 是字符串，则它指定字符编码：
//fs.readFile('./fs文件系统.txt', 'utf8', callback);

// 2.1、promise式异步文件读取 - 用立即执行函数来制造 异步环境， 注： await 必须在 async函数下运行！！！
(async () => {
    const { promisify } = require('util'); //util（实用工具）util 模块用于支持 Node.js 内部 API 的需求。 大部分实用工具也可用于应用程序与模块开发者
    // 将原生的fs.readFile变为带Promise特性
    const readFile = promisify(fs.readFile);

    const data = await readFile('./fs文件系统.txt');
    console.log(data.toString());
})();

// 2.2、promise式异步文件读取 - 用 nodejs中的process（进程），process对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。作为全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()来制造 异步环境
process.nextTick(async () => {
    const { promisify } = require('util');

    // 将原生的fs.readFile包装为带Promise特性
    const readFile = promisify(fs.readFile);

    const data = await readFile('./fs文件系统.txt');
    console.log(data.toString());
})
