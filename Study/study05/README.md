# Nodejs 持久化数据 - MongoDB

---

## MongoDB 创建数据库

## use 命令

MongoDB通过命令`use 数据库名`创建数据库。如果数据库不存在，该命令将创建一个数据库，否则将返回已有数据库。

### 语法：use 数据库名

例：使用`mydb`为数据库名

```shell
> use mydb
switched to db mydb
```



查看当前所在数据库

```shell
> db
mydb
```



查看所有数据库

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

为什么没有看到刚才创建的 mydb 数据库？？

这是因为在MongoDB中，没有任数据的空数据库是不会显示的，所以需要向其插入至少一个文档。

```shell
> db.user.save({name:"沐枫", job:"Web前端"}) 	// user 就是集合名(表名) 表是向user表插入一条数据
或
> db.site.insert({name:"沐枫", job:"Web前端"}) 	// 和上面效果一样，都是插入数据

// 当向集合中插入至少一个文档后，现在再来看，就有的mydb这个数据库啦
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
```



### Sequelize模块： [sequelize官网 - https://sequelize.org](https://sequelize.org)

> Sequelize是用于Postgres，MySQL，MariaDB，SQLite和Microsoft SQL Server的基于Promise承诺的Node.js ORM。
>
> 它具有可靠的事务支持，关系，急切和延迟加载，读取复制等功能。

```js
安装命令：npm install --save sequelize
```

### 

