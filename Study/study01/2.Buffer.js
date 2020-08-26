/**
 * Buffer 缓冲区（内存缓冲区）
 * Buffer 对象用于表示固定长度的字节序列，可操作二进制。 许多 Node.js API 都支持 Buffer。
 * Buffer 类是 JavaScript 的 Uint8Array 类的子类，且继承时带上了涵盖额外用例的方法。 只要支持 Buffer 的地方，Node.js API 都可以接受普通的 Uint8Array。
 * 
 * Buffer 用于在TCP流、文件系统操作、以及其他上下文中与八位字节流进行交互。
 * 注：八位字节组成的数组，可以有效的在JS中存储十进制数据。1byte = 8bit === 1个字节 = 8位
 * 
 * Buffer - 用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。 八位字节组成的数组，可以有效的在JS中存储二进制数据
 */

 const buf1 = Buffer.alloc(10);  // 开辟10个内存空间
 console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>


 const buf2 = Buffer.from('ABC'); // 存储英文字符串
 console.log(buf2); // <Buffer 41 42 43> 1个英文字符占一个字节


 const buf3 = Buffer.from('沐枫'); // 存储中文字符串
 console.log(buf3); // <Buffer e6 b2 90 e6 9e ab> 1个中文字符占2到3个字节
 console.log(buf3.toString())


 const buf4 = Buffer.concat([buf2, buf3]); // 链接Buffer
 console.log(buf4, buf4.toString()); // <Buffer 41 42 43 e6 b2 90 e6 9e ab> ABC沐枫

