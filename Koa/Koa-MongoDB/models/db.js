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
                MongoClient.connect(this.config.host, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
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
