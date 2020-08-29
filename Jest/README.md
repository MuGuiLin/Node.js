# 单元测式 Jest 快速入门

> Jest是一个令人愉快的 JavaScript 测试框架，专注于简洁明快。
> 他适用但不局限于使用以下技术的项目：Babel, TypeScript, Node, React, Angular, Vue

## [Npm仓库](https://www.npmjs.com/package/jest)，[开发文档](https://jestjs.io/zh-Hans/)

## 1、安装jest库 
```js
    npm install jest -g
    npm install --save-dev jest
    
```

## 2、在对应测试js文件（如index.js）的同级目录，创建 __tests__ 文件夹，再新一个与对应测试js文件同名的 index.spec.js
```js
    /* 
     * index.spce.js
     */
    // 字符串变量
    const msg = '你好，世界';

    // 求和函数
    function sum(a, b) {
        return a + b;
    };

    // 导出
    module.exports = { msg, sum };
    

    /* 
     * index.spce.js
     */
    // 导入要测试的js文件
    const { msg, sum } = require('../index');

    // 测试1
    test('我是测试标题：测试msg中的内容是否正常输出！', () => {

        // 测试输出msg
        console.log(msg);

    });

    // 测试2
    test('测试：用求和函数 sum() 3 + 2 是不是等5！', () => {

        // 用断言方式，使用 expect 和 toBe 来测试两个值完全相同。 若要了解Jest关于测试方面更多的能力，请参阅 Using Matchers。

        // 测试sum函数 - 测试用例(如果 expect()执行的结果和toBe()中的值相等，就测试通过)
        expect(sum(3, 2)).toBe(5);

        console.log(sum(3, 2));
    });

```

## 3、运行测试：
```js
    jest ./demo   //语法： jest 测试代码目录

	// 当运行上面命令时，会自动找到demo目录下的index.js这个索引文件，然后再去匹配 __tests__/index.spce.ts这个测试文件，再根据测试用例进行测试！

 	// 注：如果直接在demo目录中去执行 jest index 或 jest ./index 会把其他目录的测试代码也通通运行一次哦！！
```

## 4、热更新：由于每次修改index.js 或 index.spce.ts文件都要去重启服务，太过麻烦！此时可在运行命令后面 加上 --watch 参数
```js
    jest ./demo --watch
```

