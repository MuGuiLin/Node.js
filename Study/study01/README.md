# Nodejs 基础核心

**Node.js中文网：**[http://nodejs.cn/api](http://nodejs.cn/api/)，[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn/)

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。

### 1、fs [文件系统](http://nodejs.cn/api/fs.html)

> `fs` 模块提供了用于与文件系统进行交互（以类似于标准 POSIX 函数的方式）的 API。

```js
const fs = require('fs');
```



### 2、buffer [缓冲器 - 内存](http://nodejs.cn/api/buffer.html)

> `Buffer` 对象用于表示固定长度的字节序列。 许多 Node.js API 都支持 `Buffer`。
>
> `Buffer` 类是 JavaScript 的 [`Uint8Array`](http://nodejs.cn/s/ZbDkpm) 类的子类，且继承时带上了涵盖额外用例的方法。 只要支持 `Buffer` 的地方，Node.js API 都可以接受普通的 [`Uint8Array`](http://nodejs.cn/s/ZbDkpm)。
>
> `Buffer` 类在全局作用域中，因此无需使用 `require('buffer').Buffer`。

```js
// 创建一个长度为 10 的 Buffer，
// 其中填充了全部值为 `1` 的字节。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill()、write() 或其他能填充 Buffer 的内容的函数进行重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含字节 [1, 2, 3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含字节 [1, 1, 1, 1] 的 Buffer，
// 其中所有条目均使用 `(value & 255)` 进行截断以符合 0-255 的范围。
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// 创建一个 Buffer，其中包含字符串 'tést' 的 UTF-8 编码字节：
// [0x74, 0xc3, 0xa9, 0x73, 0x74]（以十六进制表示）
// [116, 195, 169, 115, 116]（以十进制表示）
const buf6 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf7 = Buffer.from('tést', 'latin1');
```



### 3、stream [流，文件流](http://nodejs.cn/api/stream.html)

> 流（stream）是 Node.js 中处理流式数据的抽象接口。 `stream` 模块用于构建实现了流接口的对象。
>
> Node.js 提供了多种流对象。 例如，[HTTP 服务器的请求](http://nodejs.cn/s/2RqpEw)和 [`process.stdout`](http://nodejs.cn/s/tQWUzG) 都是流的实例。
>
> 流可以是可读的、可写的、或者可读可写的。 所有的流都是 [`EventEmitter`](http://nodejs.cn/s/pGAddE) 的实例。
>
> 访问 `stream` 模块：

```js
const stream = require('stream');
```

**尽管理解流的工作方式很重要，但是 stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。**



### 4、process  [进程](http://nodejs.cn/api/process.html)

> `process` 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。 作为全局变量，它始终可供 Node.js 应用程序使用，无需使用 `require()`。 它也可以使用 `require()` 显式地访问：

```js
const process = require('process');
```

### 5、child_process [子进程](http://nodejs.cn/api/child_process.html)

> `child_process` 模块提供了衍生子进程（以一种与 [`popen(3)`](http://nodejs.cn/s/zGgP4K) 类似但不相同的方式）的能力。 此功能主要由 [`child_process.spawn()`](http://nodejs.cn/s/CKoDGf) 函数提供：

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```