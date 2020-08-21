/**
 * http://nodejs.cn/api/stream.html
 * 
 * 流stream 是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。
 * 
 * Node.js 提供了多种流对象。 例如，HTTP 服务器的请求和 process.stdout 都是流的实例。
 * 
 * 流可以是可读的、可写的、或者可读可写的。 所有的流都是 EventEmitter 的实例。
 * 
 * 访问 stream 模块：
 * 
 * const stream = require('stream');
 * 尽管理解流的工作方式很重要，但是 stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。
 * 
 * 通过管道流入到可写流的来源流。当在可读流上调用 stream.pipe() 方法时会发出 'pipe' 事件，并将此可写流添加到其目标集。
 */

const fs = require('fs');

// 读取数据的流 (文件流)
const crs = fs.createReadStream('./3.http-demo/img/123.png');

//  console.log(crs);

// 写入数据的流
const cws = fs.createWriteStream('./img/vue.png');

// 管道 执行 （将图片./3.http-demo/img/123.png 在 ./img/目录下创建一个以vue.png命名的图片 ）
crs.pipe(cws);

/**
 * 白话说明：
 *  crs就相当于水池A, cws就相当于水池B, pipe()就是水管道。
 * 
 *  crs.pipe(cws) 就是将水池A中的水流向水池B。
 */

 // 实例：请看3.http-demo中的server.js中的图片请求处理
