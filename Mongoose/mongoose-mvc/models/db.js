const mongoose = require('mongoose');
const base = require('../controller/db-config').base;

const db = mongoose.createConnection('mongodb://localhost/' + base.name);

db.once('open', (callBack) => {
    console.log('数据库', base.name, '链接成功！');
});

//计设一个users集合/表
let users = new mongoose.Schema({
    name: { type : String },
    sex: { type : String },
    age: { type : Number },
    job: { type : String },
    time: { type : Date },
});

//外向暴露users集合/表
module.exports.users = db.model('users', users);


//计设一个draft集合/表
let draft = new mongoose.Schema({
    id: { type : Number},
    name: { type : String },
    title: { type : String },
    cover: { type : String },
    step: { type : Number },
    time: { type : Date },
});

//创建draft的静态 insert查询方法 
draft.statics.insert = function (data, callBack)  {
    this.model('draft').find(data, callBack);
};


//创建draft的静态 updata修改方法 
draft.statics.updata = function (data, updata, options, callBack) {
    this.model('draft').update(data, updata, options, callBack);
};

//外向暴露draft集合/表
module.exports.draft = db.model('draft', draft);