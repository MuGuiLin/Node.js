/**
 * Mongoose模块化
 * 
 * 用户操作模块
 */

const db = require('./db');

/**
 * 集合关系映射 Schema：
 *  1、 一个集合对应一个Schema()
 *  2、Schema({})里面的对象[字段]名，和集合中的[字段]名 也是一一对应）
 *  3、Schema()不具备数据操作能力，只是对集合有映射关系！！
 *  4、Schema({}) 可以给字段设置默认参数(如果在新增 或 修改时 传来了数据就以传来的为准，没传就以设置默认参数为准),
 *  5、注：为保证统一性，如果在新增 或 修改时数据时传来了数据字段在Schema({})中不存在，则会被忽略掉！！  
 */

const UsersSchema = db.Schema({
    username: {
        type: String,
        trim: true,  // mongoose预定义模式修饰符 去除左右空格
        // index: true, // 设置普通索引
        unique: true, // 设置唯一通索引
    },
    password: String,
    sex: {
        type: Number,
        default: 0, // 默认参数：0：保密，1：先生，2：女士
        min: 0, // 最小值
        max: 2,  // 最大值
        // 自定义修饰符（在返回数据前） 添加判断格式
        get(par) {
            return 1 == par ? '先生' : 2 == par ? '女士' : '保密'
        }
    },
    age: String,
    email: String,
    phone: String,
    hobbys: Array,
    binary: Buffer,
    living: Boolean,
    date: {
        type: Date,
        default: new Date()  // 默认参数：当前时间
    }
});

// console.log('----------Schema：', UsersSchema);

// 挂载自定义静态方法 statics 用回调函数 根据id返回username,sex,age
UsersSchema.statics.getPeople = function (json = {}, callback) {
    this.findOne(json, (err, doc) => {
        if (!err) {
            const body = {
                username: doc.username,
                sex: doc.sex,
                age: doc.age
            }
            callback(body);
        } else {
            callback(err);
        }
    });
};


// 挂载自定义静态方法 statics 用Promise 返回所有username,sex,age
UsersSchema.statics.getPeople2 = function (json = {}) {
    return new Promise((resolve, reject) => {
        this.find(json, { _id: 0, username: 1, sex: true, age: 1 }, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err);
            }
        });
    });
};


/**
 * 集合操作模型:
 *  1、集合名首字母要大写！！
 *  2、model()方法中的第一个参数是数据库中对应的集合名（注：如果指定的该集合不存了，则在插入数据时自动创建该集合）
 *  3、model()方法中的第二个参数是集合关系映射Schema名
 *  3、model()方法中的第三个参数是和指定的集合建立关联(如果应参数没有，就操作的第一个参数对应的集合，当然这第三个参数也可以是和第一个参数对应的集合相同(注：这里用小写用可以啦！！))
 */

// 外向暴露users集合模型，供各Api、View调用 
module.exports = db.model('Users', UsersSchema);