//引用mongoose模块
const mongoose = require('mongoose');

//链接数据库（数据库不存在，就创建并链接， 存在就直接链接mupiao）
mongoose.connect('mongodb://localhost/mupiao');

//创建模型 (集合名/表名users) 设计字段名，和 数据类型
const table = mongoose.model('users', {
    name: String,
    sex: String,
    age: Number,
    job: String,
    time: Date
});

//实例化 table 往users中插入各字段对应的数据【注：必须对应上面的字段名，不然不能插入数据库】 key: name value: mupiao ......
const insert = new table({
    name: 'mupiao',
    sex: '男',
    age: 28,
    job: 'Web前端开发',
    time: new Date()
});

//执行插入操作，往数据库中插入。完成时的回调方法  【每执行一次，就往数据库中插入一次】
insert.save().then(() => {
    console.log('Hello, meow, 666 !');
});