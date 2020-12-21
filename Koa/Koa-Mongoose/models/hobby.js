/**
 * Mongoose模块化
 * 
 * 新闻操作模块
 */

const db = require('./db');

const HobbySchema = db.Schema({
    "hobby_id" : Number,
    "name" : {
        type: String,
        trim: true  // mongoose模式修饰符 去除左右空格
    },
});


module.exports = db.model('Hobby', HobbySchema, 'hobby');