/**
 * mongodb 模块是 MongoDB官方提供的在Node.js中操作mongodb数据库的第三方模块
 * http://mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start/
 */

const MongoClient = require('mongodb').MongoClient;

const Config = require('../config/data-base.json');

class Db {

    static dataBase() {
        // 单例模式：多实例共享（只实例化类1次）也就是只连接1次数据库，第2次实例化时直接返回之前实例化好的实例对象，从而解决多次连接数据库问题！
        if (!Db.isInit) {
            Db.isInit = new Db();
        }
        // else{return Db.isInit;} 注：这里不能用 else{} 因为不会走else！！
        return Db.isInit;
    };

    constructor() {
        this.client = null;
        this.connect();
    };

    connect() {
        return new Promise((resolve, reject) => {
            if (this.client) {
                resolve(this.client);
            } else {
                MongoClient.connect(Config.development.host, (error, client) => {
                    if (error) {
                        reject(error);
                        console.log("数据库连接失败！", error);
                    } else {
                        this.client = client.db(Config.development.database);
                        resolve(this.client);
                    }
                });
            }
        });
    };

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                const result = db.collection(collectionName).find(json);
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

    update() {

    };

    insert() {

    };

    delete() {

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
