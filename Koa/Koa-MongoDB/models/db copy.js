/**
 * mongodb 模块是 MongoDB官方提供的在Node.js中操作mongodb数据库的第三方模块
 * http://mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start/
 */

const MongoClient = require('mongodb').MongoClient;

const Config = require('../config/data-base.json');

// 数据库连接
MongoClient.connect('mongodb://localhost:27017/', (error, client) => {
    if (error) {
        console.log('数据库连接失败！', error);
        return false;
    } else {

        console.log('数据库连接成功！');

        // 指定数据库
        const db = client.db(Config.development.database);

        // 指定集合
        const users = db.collection('users');

        // 查看集合
        users.find({}).toArray(function (err, docs) {
            if (!err) {
                console.log(docs)
            }
        });

        // 插入数据
        // http://mongodb.github.io/node-mongodb-native/3.6/api/
        // let data = {
        //     "username": "马超",
        //     "password": "123456",
        //     "sex": 2,
        //     "age": 35,
        //     "email": "machao@qq.com",
        //     "phone": "13558793025",
        //     "hobbys": [2, 3]
        // };
        // users.insertOne(data, (err, result) => {
        //     if (!err) {
        //         console.log('OK666');
        //     }
        // })

        // // 查看集合
        // users.find({}).toArray(function (err, docs) {
        //     if (!err) {
        //         console.log(docs)
        //     }
        // });

        // 关闭数据库连接
        client.close();
    }
});
