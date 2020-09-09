# Egg.js

egg.js官方文档：[https://eggjs.org](https://eggjs.org)

> Egg.js 是一个基于 Koa 的企业级 Node.js 框架 
>
> Egg.js为建造而生 使用Node.js和Koa更好的企业框架和应用程序， Egg 是以 Koa 作为其基础框架，在Koa的模型基础上，进一步对它进行了一些增强。
>
> + **三层结构**：
>
>   - 信息资源层 就是 action，或者 servlet，⽤来处理上下游数据结构。 
>
>   - 业务逻辑层⼀般应⽤中会有⼀层service抽象，实现核⼼业务逻辑，事务控制也在这⼀层实 现。 
>   - 数据访问层也即dao层，重点负责数据库访问，完成持久化功能。



## 用CLI方式创建项目

1、安装CLI脚手架  [https://www.npmjs.com/package/egg-init](https://www.npmjs.com/package/egg-init)   `egg-init` 就官方提供的脚手架工具，方便用于创建项目！

```shell
npm i egg-init -g // 如果已安装，此处略过，直接到第2步
```

2、创建项目

```shell
egg-init myegg --type=simple  // 初始化项目目录（用egg-init命令创建一个名为myegg的项目）加上 --type=simple参数表示egg应用样板，不加就自己选择！
cd myegg	// 进入项目目录
npm i 	// 安装依赖 i === install

// 启动项⽬
npm run dev

// 默认端口
 http://localhost:7001 或 http://127.0.0.1:7001
 
 
 
// 初始化项目目录 egg-init xxxx --type= 参数说明如下：
 
 【simple】 -> Simple egg app boilerplate 	// 简单的Egg应用样板
 【microservice】 -> Microservice app boilerplate based on egg 	// 基于Egg的微服务应用样板
 【sequelize】 -> egg app with sequelize 	// 带sequelize的egg应用
 【ts】 -> Simple egg && typescript app boilerplate 	// 简单的Egg && Typescript应用样板
 【empty】 -> Empty egg app boilerplate 	// 空鸡蛋应用程序样板
 【plugin】 -> egg plugin boilerplate 	// 蛋插件样板
 【framework】 -> egg framework boilerplate 	// 鸡蛋框架样板

```





## 非CLI方式创建项目：

[egg Npm下载地址](https://www.npmjs.com/package/egg)

[egg-bin Npm下载地址](https://www.npmjs.com/package/egg-bin)

1、安装初始化依赖项

```shell
mkdir egg-demo // 创建项目根目录
cd egg-demo

npm init // 初始化package.json

npm install egg --save	//安装egg主依赖
npm install egg-bin --save-dev	// egg-bin 安装热启动dev、测试test、调试debug等依赖项
```

2、在 `package.json`文件中的`scripts`配置项中添加如下配置

```shell
{
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

3、创建项目工程结构

```shell
// 在项目根目录中创建如下目录
mkdir app // 工程目录 在app目录中创建3层分层结构，其对应的3个目录：controller, service，model
mkdir config // 配置文件存放目录
```

![egg项目目录结构](D:\node\Node.js\Egg\egg.js目录结构.png)

## 数据持久化

创建模型层：以mysql + sequelize为例

[egg-sequelize下载地址](https://www.npmjs.com/package/egg-sequelize)

[mysql2 下载地址](https://www.npmjs.com/package/mysql2)

```shell
// 安装
npm install mysql2
npm install egg-sequelize
```

在 config/plugin.js 中引⼊ egg-sequelize 插件

```json
// 配置egg-sequelize 数据库模块
sequelize: {
    enable: true,
    package: "egg-sequelize"
}
```

在 config/config.default.js 中编写 sequelize 配置

```json
const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: "mysql",
      host: "localhost" || "127.0.0.1",
      port: 3306,
      database: "mu_piao",
      username: "root",
      password: ""
    }
};
```

编辑数据库模型 app/model/user.js

```js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
 
  const User = app.model.define('user', {
    login: STRING,
    name: STRING(30),
    password: STRING(32),
    age: INTEGER,
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });
 
  User.findByLogin = async function(login) {
    return await this.findOne({
      where: {
        login: login
      }
    });
  }
 
  // don't use arraw function
  User.prototype.logSignin = async function() {
    return await this.update({ last_sign_in_at: new Date() });
  }
 
  return User;
};
```



## 编写路由、控制器等

> 由于当业务逻辑过于复杂后，就可以分层处理(三层：controller -> service -> model)，将业务逻辑放在专门的service目录中,将数据模型放在model目录中!

这里以user控制器为例 

app/controller/user.js

```js

class UserController extends Controller {
  async index() {
    const users = await this.ctx.model.User.findAll();
    this.ctx.body = users;
  }
 
  async show() {
    const user = await this.ctx.model.User.findByLogin(this.ctx.params.login);
    await user.logSignin();
    this.ctx.body = user;
  }
}
```

路由：app/router.js

```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/user', controller.user.index);

  router.get('/getUser', controller.user.getUser);
  
  router.get('/getAllUser', controller.user.getAllUser);
};

```



## API接口文档 工具 Swagger

> Swagger 是⼀个规范和完整的框架，⽤于⽣成、描述、调⽤和可视化 RESTful ⻛格的 Web 服务。
>
> Npn地址：[https://www.npmjs.com/package/egg-swagger-doc-feat](https://www.npmjs.com/package/egg-swagger-doc-feat)
>
> # egg-swagger-doc-feat
>
> 应用于eggjs的plugin,可自动生成SwaggerUI。应用启动后访问/swaagger-ui.html可以浏览页面，访问/swagger-doc,获取swaggerjson

使用方法: [https://www.nodenpm.com/egg-swagger-doc-feat/package.html](https://www.nodenpm.com/egg-swagger-doc-feat/package.html)

```shell
// 安装
npm i egg-swagger-doc-feat --save
```

```js
//注册swagger插件 config/plugin.js
module.exports = {
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  }
};
```

```js
// 配置swagger信息 config/config.default.js
config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
        title: '我的API接⼝文档',
        description: 'swagger-ui for egg',
        version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true,
}
```

**API文档查看地址**：

[http://localhost:7001/swagger-doc](http://localhost:7001/swagger-doc)

[http://localhost:7001/swagger-ui.html](http://localhost:7001/swagger-ui.html)

