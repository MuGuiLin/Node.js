/**
 * mongoose 是在mongodb模块的基础上封装的一个适用于node.js的优雅mongodb对象建模
 *  英文官网 https://mongoosejs.com
 *  中文官网 http://www.mongoosejs.net
 */
const Mongoose = require('mongoose');

const { database } = require('../config/index');

/**
 * 连接数据库 connect()
 *  参数1：String mongodb数据库连接地址
 *  参数2：Object {useNewUrlParser: true} 是MongoDB v4.x才有的，用于在url里识别验证用户所需要的db，{useUnifiedTopology:true}是当前服务器发现和监视引擎已弃用，将在将来的版本中删除。使用新的服务器发现和监视引擎，通过选项{useUnifiedTopology:true}指向MongoClient构造函数
 *  参数3：回调函数监听数据库连接成功与否
 */
Mongoose.connect(database.host, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error("\n*** 数据库连接失败 -->", error);
    } else {
        console.log("\n*** 数据库连接成功 -->", database.host);
        // console.log("\n*** 数据库连接成功 -->", client);
    }
});

/**
 * Mongoose模块化
 * 外向暴露Mongoose连接实例，供各个集合(表)模块调用
 * 
 * 注：mongoose模块以单例模式封闭好了数据库连接，尽管多次调用Mongoose实例也只会连接一次数据库！！
 */
module.exports = Mongoose;
