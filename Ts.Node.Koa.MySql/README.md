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

* 3、安装 class-validator模块 用于数据类型验证用的修饰符等
```js
    npm i class-validator
```

* 4、在src目录下创建controllers目录，用于存放控制器和方法、Api接口

要获取 post方式传过来的参数，还需要如 koa-bodyparser 等可以接收post参数的模块
```js
    npm i -D koa-bodyparser

    npm i -D @types/koa-bodyparser //类型声明

    //然后在 koa-bodyparser 在app.ts文件中引入，并注册到app.use()中，如：App.use(KoaBodyParser());
```

* 5、编写API接口，controllers目录新建相应的.ts接口文件

```js
    import { Controller, Get, Params, Query, Body, Post, Header } from "koa-ts-controllers";

    // '/user'就是控制器，@Controller是类装饰器
    @Controller('/user')    
    export class UserController {

        // '/login'就是方法(Api接口) 方法装饰器 注: 这是名字就是方法(Api接口的名字哦), 而下面的方法名可以任意写(不能与其他字名重得就OK) 所以一般装饰器名和方法都名一样 
        @Get('/login')  
        public async Login(@Query('name') name: any) {
            return 'OK 登录Api 访问成功！';
        };

        // 注：post方式要 专门post获取如 koa-bodyparser 才行哦
        @Post('/regist')
        public async regist(@Header() head: any, @Body({ required: true }) body: any) {
            
            console.log('\n头信息', head);
            console.log('\n主体信息', body);
            // 数据应从数据库取，这里只是为是演示用的
            return {
                code: 100,
                data: {},
            };
        };
    }
```





# sequelize(对MySQL、SQLite、MSSQL等数据库操作进行封装提供统一的API) 与 sequelize-cli 基于Node.js的ORM对象关系映射（像操作对象一样的去操作数据库，而不是SQL）

* sequelize 与 sequelize-cli 就像vue 和 vue-cli的关系差不多。

* 1、安装 sequelize
```js
    npm i sequelize
```

* 2、安装 sequelize-cli
```js
    npm i -D sequelize-cli
```

* 3、安装 mysql2 数据库操作模块
```js
    npm i mysql2
```

* 4、在根目录下创建 .sequelizerc文件
内容如下：
```js
    const path = require('path');

    module.exports = {
        'env': 'development',
        'debug': true,
        'config': path.resolve('src', 'database/config.json'),
        'models-path': path.resolve('src', 'database/models'),
        'seeders-path': path.resolve('src', 'database/seeders'),
        'migrations-path': path.resolve('src', 'database/migrations')
    };
```

* 5、在src目录下新建database目录，并在该目录下新建config.json文件用于配置数据库信息
内容如下：
```json
    {
        "development": {
            "host": "localhost",
            "prot": 3306,
            "dialect": "mysql",
            "username": "root",
            "password": null,
            "database": "ts_node_koa_mysql"
        },
        "test": {

        },
        "production": {

        }
    }
```

* 6、配置创建/销毁数据库命令 用sequelize-cli来操作，在package.json中的scripts项下添加 
```json
    {
        "db:create": "sequelize db:create",   // 创建数据库
        "db:drop": "sequelize db:drop",       // 销毁数据库,
        "db:migrate": "sequelize db:migrate", // 创建表
        "db:migrate:undo:all": "sequelize db:migrate:undo:all" // 撤销所有创建
    }
```

* 7、启动数据库环境如： WampServer、Navicat for MySQL 等，然后在项目根目录(和.sequelizerc文件同级)中打开命令行工具运行如下命令
```js
    npm run db:create //创建数据库 (它会根据.sequelizerc文件的配置执行，并读取到database/config.json文件进行配置)
```




# 创建表、设计表结构（也可自己手动在数据库管理工具中完成哦！！）

## 以下是用命令来创建
* 1、在src/database目录下创建migrations目录，并创建迁移.js脚本文件（可手动 或 用命令: sequelize migration:create --name UserInit ） // 这个UserInit可自定义命名，最好根表相关
```js
    'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // 创建User表
    return queryInterface.createTable('User', 
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,        // 值自增
                primaryKey: true,           // 主键
            },
            name: {
                type: Sequelize.STRING(50), //字符串类型
                unique: true,               // 值唯一（不能重复）
                allowNull: false            // 不能为空
            },
            password: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
            sex: {
                type: Sequelize.CHAR(8),     //字符类型
                defaultValue: '男'
            },
            createdAt: {
                type: Sequelize.DATE,       //日期类型
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, 
        {
            charset: 'utf8mb4'
        });
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // 删除User表
    return queryInterface.dropTable('User');
  }
};

```

* 2、创建表
```js
    npm run db:migrate //(它会根据src/database/migrations目录下的相关.js文件中的配置进行创建表及表结构) 注：它只会执行没执行过的表文件（因为有创建记录，或表中有数据）
```