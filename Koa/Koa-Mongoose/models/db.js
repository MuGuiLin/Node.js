/**
 * mongodb 模块是 MongoDB官方提供的在Node.js中操作mongodb数据库的第三方模块
 * 
 * http://mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start
 * 
 * http://mongodb.github.io/node-mongodb-native/3.6/api/ObjectID.html
 */
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

const { database } = require('../config/index');
class Db {

    // 静态方法
    static dataBase(opts) {
        // 单例模式：多实例共享（只实例化类1次）也就是只连接1次数据库，第2次实例化时直接返回之前实例化好的实例对象，从而解决多次连接数据库问题！
        if (!Db.isInit || opts) {
            Db.isInit = new Db(opts);
        }
        // else{return Db.isInit;} 注：这里不能用 else{} 因为不会走else！！
        return Db.isInit;
    };

    constructor(opts) {
        this.client = null;
        this.config = { ...database, ...opts };
        this.connect();
    };

    connect() {
        return new Promise((resolve, reject) => {
            if (this.client) {
                resolve(this.client);
            } else {
                // 当前服务器发现和监视引擎已弃用，将在将来的版本中删除。使用新的服务器发现和监视引擎，通过选项{useUnifiedTopology:true}指向MongoClient构造函数。
                MongoClient.connect(this.config.host, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
                    if (error) {
                        reject(error);
                        console.error("\n*** 数据库连接失败 -->", error);
                    } else {
                        // 保存数据库连接对象，方像第2次调用时，直接返回使用
                        this.client = client.db(this.config.database);
                        resolve(this.client);
                        console.log("\n*** 数据库连接成功 -->", this.config.host);
                    }
                    // 关闭连接
                    // client.close();
                });
            }
        });
    };

    ObjectId(_id) {
        return new ObjectID(_id);
    }

    find(collectionName, json, projection = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                const result = db.collection(collectionName).find(json, projection);
                // 数据返回方法1
                // const arrs = [];
                // result.each((err, docs) => {
                //     if (err) {
                //         reject(err);
                //     } else {
                //         if (null != docs) {
                //             arrs.push(docs);
                //         } else {
                //             resolve(arrs);
                //         }
                //     }
                // });

                // 数据返回方法2
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            }).catch((error) => {
                // console.log("数据库连接失败！", error);
            });
        });
    };

    findOne(collectionName, json, projection = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).findOne(json, projection).then((docs) => {
                    resolve(docs);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    };

    update(collectionName, json, data) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).update(json, { $set: data }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };

    updateOne(collectionName, json, data) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json, { $set: data }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };

    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insert(json, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };

    insertOne(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };

    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).remove(json, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };

    removeOne(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    };
};

module.exports = Db.dataBase();


/**
 * mongoose 是在mongodb模块的基础上封装的一个适用于node.js的优雅mongodb对象建模
 *  英文官网 https://mongoosejs.com
 *  中文官网 http://www.mongoosejs.net
 */
const Mongoose = require('mongoose');

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
        console.log("\n*** 数据库连接成功 -->", client);
    }
});

/**
 * 集合关系映射 Schema：
 *  1、 一个集合对应一个Schema()
 *  2、Schema({})里面的对象[字段]名，和集合中的[字段]名 也是一一对应）
 *  3、Schema()不具备数据操作能力，只是对集合有映射关系！！
 *  4、Schema({}) 可以给字段设置默认参数(如果在新增 或 修改时 传来了数据就以传来的为准，没传就以设置默认参数为准),
 *  5、注：为保证统一性，如果在新增 或 修改时数据时传来了数据字段在Schema({})中不存在，则会被忽略掉！！  
 */

const usersSchema = Mongoose.Schema({
    username: String,
    password: String,
    sex: {
        type: Number,
        default: 0 // 默认参数：0：保密，1：先生，2：女士
    },
    age: String,
    email: String,
    phone: String,
    hobbys: Array,
    date: {
        type: Date,
        default: new Date().toJSON()  // 默认参数：当前时间
    }
});


/**
 * 集合操作模型:
 *  1、集合名首字母要大写！！
 *  2、model()方法中的第一个参数是数据库中对应的集合名（注：如果指定的该集合不存了，则在插入数据时自动创建该集合）
 *  3、model()方法中的第二个参数是集合关系映射Schema名
 *  3、model()方法中的第三个参数是和指定的集合建立关联(如果应参数没有，就操作的第一个参数对应的集合，当然这第三个参数也可以是和第一个参数对应的集合相同(注：这里用小写用可以啦！！))
 */
const users = Mongoose.model('Users', usersSchema); // 操作users集合
// const users = Mongoose.model('Users', usersSchema, 'news');  //操作news集合

/**
 * 查询集合数据 find()、findOne()
 *  参数1：查询条件
 *  参数2：投影：指定要返回[1/true] 或 不返回[0/false]的字段，不指定就返回全部字段 如指定：{_id:0, sex:0, age:false}
 *  参数3：回调函数监听、获取查询结果
 */
users.find({}, {}, (err, doc) => {
    if (err) {
        console.error("\n*** 查询失败 -->", err);
    } else {
        console.log("\n*** 查询成功 -->", doc);
    }
});

/**
 * 修改集合数据 update()、updateOne()、updateMany()
 *  参数1：查询条件
 *  参数2：要修改的数据
 *  参数3：回调函数监听操作成功与否
 * 
 *  注意：不建议使用collection.update()。 请改用updateOne()、updateMany()或bulkWrite()。
 */
users.update({ _id: "5fc0c68ef87a97061c545256" }, { password: "123456" }, (err, res) => {
    if (err) {
        console.error("\n*** 修改失败 -->", err);
    } else {
        console.log("\n*** 修改成功 -->", res, res.ok);
    }
});


/**
 * 删除集合数据 delete()、deleteOne()、deleteMany()
 *  参数1：查询条件
 *  参数2：回调函数监听操作成功与否
 */
// users.deleteMany({_id: "5fca063118ab7aa554749203"}, (err, res) => {
//     if (err) {
//         console.error("\n*** 删除失败 -->", err);
//     } else {
//         console.error("\n*** 删除成功 -->", res, res.deletedCount);
//     }
// });


// return;
/**
 * 向users集合插入数据 实例化()、.save()
 * 1、先实例化集合操作模型（实例化时填写要插入的数据）
 * 2、调用save()方法，将数据插入数据库
 *  save()方法 参数1：回调函数监听操作成功与否
 */
const addUser = new users({
    username: "穆飘2",
    password: "123666",
    // sex: 2,
    age: "男",
    email: "mupiao@qq.com",
    phone: "13558465215",
    hobbys: ["1", "3"]
});
addUser.save((err, doc) => {
    if (err) {
        console.error("\n*** 插入失败 -->", err);
    } else {
        console.log("\n*** 插入成功 -->", doc);
    }
});

return false;




/**
 * 数据库连接速度测试 -> 用单例模式(多实例共享) 以提高访问速度
 */


const db = Db.dataBase();

console.time('find0');
db.find('users', {}).then((data) => {
    console.log('\n\n------实例1 -> 第1次：测试查询结束时间：');
    console.timeEnd('find0');
});
setTimeout(() => {

    console.time('find1');
    db.find('users', {}).then((data) => {
        console.log('\n\n------实例1 -> 第2次：测试查询结束时间：');
        console.timeEnd('find1');
    });
}, 3000);



const db2 = Db.dataBase();
setTimeout(() => {

    console.time('find2');
    db2.find('users', {}).then((data) => {
        console.log('\n\n------实例2 -> 第1次：测试查询结束时间：');
        console.timeEnd('find2');
    });
}, 5000);



const db3 = Db.dataBase();
setTimeout(() => {
    console.time('find3');
    db3.find('users', {}).then((data) => {
        console.log('\n\n------实例3 -> 第1次：测试查询结束时间：');
        console.timeEnd('find3');
    });
}, 8000);



const db4 = Db.dataBase();
setTimeout(() => {
    console.time('find4');
    db4.find('users', {}).then((data) => {
        console.log('\n\n------实例4 -> 第1次：测试查询结束时间：');
        console.timeEnd('find4');
    });
}, 10000);
setTimeout(() => {
    console.time('find4-1');
    db4.find('users', {}).then((data) => {
        console.log('\n\n------实例4 -> 第2次：测试查询结束时间：');
        console.timeEnd('find4-1');
    });
}, 12000);

setTimeout(() => {
    console.time('find4-2');
    db4.find('users', {}).then((data) => {
        console.log('\n\n------实例4 -> 第3次：测试查询结束时间：');
        console.timeEnd('find4-2');
    });
}, 15000);
