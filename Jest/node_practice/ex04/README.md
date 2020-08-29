# Node.js 数据持久化 - MySQL

## MySQL官⽹地址: https://www.mysql.com

> 当安装好MySQL后，在Node.js程序如何访问MySQL数据库呢？
>
> 对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。
>
> 这个访问MySQL服务器的软件包通常称为MySQL驱动程序。
>
> 不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，官方的Node.js驱动目前仅支持5.7以上版本。
>
> 目前使用最广泛的MySQL Node.js驱动程序是开源的`mysql2 `和`sequelize `，可以直接使用npm安装。



## mysql2 

> MySQL2适用于Node.js的MySQL客户端，侧重于性能。支持预备语句，非utf8编码，二进制日志协议，压缩，ssl等。
>
> MySQL2项目是MySQL-Native的延续。 协议解析器代码从头开始重写，并且更改了api以匹配流行的mysqljs / mysql。 MySQL2团队正在与mysqljs / mysql团队合作，以分解出共享代码并将其移交给mysqljs组织。
>
> MySQL2主要是与mysqljs兼容的API，并支持大多数功能。 MySQL2还提供了这些附加功能

安装：[https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)

```js
npm install --save mysql2
```

链接MySQL数据库：

```js
const mysql = require('mysql2');

// 创建并数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',          // 数据库地址
    user: 'root',               // 账户名
    database: 'koa_ts_mysql'    // 数据名称
});

// 简单查询
connection.query('SELECT * FROM `user` WHERE `username` = "小强" AND `age` > 45',
    function (err, results, fields) {
        if (!err) {
            console.log(results);   // 结果包含服务器返回的行
            // console.log(fields);    // 字段包含有关结果的额外元数据（如果有）
        } else {
            console.log('对不起：没有找到相应的数据！');
        }

    }
);
```



##  sequelize

> **Web开发ORM框架 -  sequelize**
>
> ORM 是「对象关系映射」的翻译，英语全称为Object Relational Mapping，它是一种程序设计技术，用于实现面向对象编程语言里不同类型系统的数据之间的转换。从效果上说，它其实是创建了一个可在编程语言里使用的「虚拟对象数据库」。
>
> 随着面向对象软件开发方法的发展，ORM 的概念应运而生，它用来把对象模型表示的对象，映射到基于 SQL 的关系模型数据库结构中去。这样，我们在具体的操作实体数据库的时候，就不需要再去和复杂的 SQL 语句打交道，只需简单的操作实体对象的属性和方法，就可以达到操作数据库的效果。
>
> ORM 技术是在对象和数据库之间提供了一条桥梁，前台的对象型数据和数据库中的关系型的数据通过这个桥梁来相互转化。
>
> 不同的编程语言，有不同的ORM框架。例如Java，它的ORM框架就有：Hibernate，Ibatis/Mybatis等等。
>
> 在Node Web开发中，[Sequelize](http://docs.sequelizejs.com/manual/installation/getting-started.html) 就是一款比较流行的 ORM 框架。