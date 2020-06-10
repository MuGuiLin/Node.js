# 在TypeScrit下构建 Node 服务项目步骤

* 1、新建项目根目录，进入后并用 npm init 创建 package.json 文件;

* 2、新建tsconfig.json;
配置信息如下：
``` json
{
    "compilerOptions": {
        "target": "es2016",                     // 编译js目标版本
        "module": "commonjs",                   // 编译后的模块类型【node.js => commonjs】
        "outDir": "./dist",                     // 指定编译后的js文件存放目录

        "sourceMap": true,          
        "noImplicitAny": true,                  // 隐私类型
        "strictNullChecks": true,               // 开启代码严格检查

        "allowJs": true,                        // 开启可以引入非ts模块
        "resolveJsonModule": true,              // 开启加载json模块
        "esModuleInterop": true,                // 处理非ts模块化引入问题
        "allowSyntheticDefaultImports": true,   // 处理非ts模块化导出问题

        "experimentalDecorators": true,         // 开启装饰器特性
        "emitDecoratorMetadata": true,          // 开启装饰器源数据
    },

    "include": [
        "./src/**/*"                            // ts源文件存放目录(在src目录下的所有ts文件)
    ]
}
```

* 3、新建src目录，并在该目录下创建config目录，再创建index.ts文件用于存储公用配置信息（由于默认在ts环境中没有继承Node环境的相关类型声明和API 所以要调用Node.js环境下的process对象需要安装@types/node模块）：
```js
    npm i -D @types/node
```

* 4、在src目录下创建app.ts 用于项目入口文件

* 5、安装Koa框架： 
```js
    npm i koa 
```

* 6、安装@types/koa模块 由于在ts环境中没有Koa框架的相关类型声明，的以用@types/koa来处理这个在app.ts中不引入koa模块是报错问题
```js
    npm i -D @types/koa
```

* 7、安装ts-node-dev模块 由于启动Node服务不识别.ts文件（打包为.js后就识别了），所以用ts-node-dev来启动ts文件（app.ts）的Node服务，它还有热更新功能哦！！
```js
    npm i -D ts-node-dev 
```

* 8、安装typescript模块 由于要ts-node-dev模块依赖typescript模块来编译运行，所有用要安装typescript;
```js
    npm i -D typescript
```


* 9 由于npm run ts-node-dev app.ts 命令太长，所以在package.json中的scripts项下添加 
- "start": "ts-node-dev ./src/app.ts"

* 10 最后用 npm run start 就以启动ts的Node服务啦！！


# 使用 koa-ts-controllers 模块来管理路由、中间件等（注：路由功能还是用koa-router来做的），还有就是koa-ts-controllers模块 它是ts写的很方面

* 1、安装 koa-ts-controllers模块
```js
    npm i koa-ts-controllers
```

* 2、安装 koa-rotuer模块(用于配置路由规则等)
```js
    npm i koa-router
```

* 2、安装 @types/koa-router模块 由于在ts中要识别koa-router，所以用@types/koa-router来做类型声明
```
    npm i -D @types/koa-router
```

* 3、安装 class-validator模块 用于数据类型、修饰符等验证用的
```js
    npm i class-validator
```

* 4、在src目录下创建controllers目录，用于存放控制器和方法、Api接口

要获取 post方式传过来的参数，还需要如 koa-bodyparser 等可以接收post参数的模块
```js
    npm i -D koa-bodyparser

    npm i -D @types/koa-bodyparser //类型声明

    //然后在 koa-bodyparser 在app.ts文中引入，并注册到app.use()中 如：App.use(KoaBodyParser());
```