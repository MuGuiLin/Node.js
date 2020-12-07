/**
 * mongoose 是在mongodb模块的基础上封装的一个适用于node.js的优雅mongodb对象建模
 *  英文官网 https://mongoosejs.com
 *  中文官网 http://www.mongoosejs.net
 * 
 * 注：mongoose模块以单例模式封闭好了数据库连接，尽管多次调用Mongoose实例也只会连接一次数据库！！
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





/********** 没有进行模块化的 user 集合操作（都在db.js文件中，不清晰，所以应该要各个集合一独立分离到各自的xxx.js文件中去，如：user.js、news.js等） ***********/

/**
 * 集合关系映射 Schema： http://www.mongoosejs.net/docs/schematypes.html
 *  1、 一个集合对应一个Schema()
 *  2、Schema({})里面的对象[字段]名，和集合中的[字段]名 也是一一对应）
 *  3、Schema()不具备数据操作能力，只是对集合有映射关系！！
 *  4、Schema({}) 可以给字段设置默认参数(如果在新增 或 修改时 传来了数据就以传来的为准，没传就以设置默认参数为准),
 *  5、注：为保证统一性，如果在新增 或 修改时数据时传来了数据字段在Schema({})中不存在，则会被忽略掉！！  
 * 
 */

const UsersSchema = Mongoose.Schema({
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

// console.log('----------Schema：', UsersSchema);

/**
 * 集合操作模型:
 *  1、集合名首字母要大写！！
 *  2、model()方法中的第一个参数是数据库中对应的集合名（注：如果指定的该集合不存了，则在插入数据时自动创建该集合）
 *  3、model()方法中的第二个参数是集合关系映射Schema名
 *  3、model()方法中的第三个参数是和指定的集合建立关联(如果应参数没有，就操作的第一个参数对应的集合，当然这第三个参数也可以是和第一个参数对应的集合相同(注：这里用小写用可以啦！！))
 */
const user = Mongoose.model('Users', UsersSchema); // 操作users集合
// const user = Mongoose.model('Users', UsersSchema, 'news');  //操作news集合

/**
 * 查询集合数据 find()、findOne() https://mongoosejs.com/docs/queries.html
 *  参数1：查询条件
 *  参数2：投影：指定要返回[1/true] 或 不返回[0/false]的字段，不指定就返回全部字段 如指定：{_id:0, sex:0, age:false}
 *  参数3：回调函数监听、获取查询结果
 */
user.find({}, {}, (err, doc) => {
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
 *       { $set: data } $set参数加不加都可以
 */
user.update({ _id: "5fc0c68ef87a97061c545256" }, { password: "123456" }, (err, res) => {
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
user.deleteMany({_id: "5fca063118ab7aa554749203"}, (err, res) => {
    if (err) {
        console.error("\n*** 删除失败 -->", err);
    } else {
        console.error("\n*** 删除成功 -->", res, res.deletedCount);
    }
});


// return;
/**
 * 向users集合插入数据 实例化()、.save()
 * 1、先实例化集合操作模型（实例化时填写要插入的数据）
 * 2、调用save()方法，将数据插入数据库
 *  save()方法 参数1：回调函数监听操作成功与否
 */
const addUser = new user({
    username: "穆飘",
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