# 自定义 封装 CLI 工具

> 用Nodejs 自定义实现一个简单的cli工具（开发一个cli工具）

### 1、建立工程目录
```js
    mkdir my-cli-tool
    cd my-cli-tool
```

### 2、初始化package.json包管理文件
```js
    npm init -y
```

### 3、安装相关构建cli的工具模块
```js
    npm install commander download-git-repo ora handlebars figlet clear chalk open -s

    相关模块链接：
    https://www.npmjs.com/package/commander             // 主要模块
    https://www.npmjs.com/package/download-git-repo     // 下载指定项目
    https://www.npmjs.com/package/ora                   // 状态提示
    https://www.npmjs.com/package/handlebars
    https://www.npmjs.com/package/figlet                // 文字放大效果模块
    https://www.npmjs.com/package/clear                 // 清屏
    https://www.npmjs.com/package/chalk                 // 粉笔模块（修饰log函数，如果加颜色等）
    https://www.npmjs.com/package/open                  // 在浏览器中打开指定网址
```

### 4、建立bin 目录, 创建js脚本文件
```js
    mkdir bin
    cd bin

    // 创建js脚本文件，如mupiao.js （命名自定义）
    // mupiao.js 内容如下
    
    #!/usr/bin/env node  //指定脚本解释器为node
    console.log('测试打印输出！');
```

### 5、在package.json文件中，添加如下代码，配置自定义命令
```js
    "bin": {
        "mupiao": "./bin/mupiao.js"   // 当在命令窗口中输入mupiao 回车时，运行的就是./bin/mupiao.js文件
    },
```

### 6、建立软链接，将my-cli-tool 进行临时性的全局安装，这可以全局使用mupiao命令啦！
```js
    npm link  // 将my-cli-tool 创建快捷方式到 C:\Users\Administrator\AppData\Roaming\npm\node_modules 目录中
```