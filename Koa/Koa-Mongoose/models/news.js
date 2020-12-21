/**
 * Mongoose模块化
 * 
 * 新闻操作模块
 */

const db = require('./db');

const NewsSchema = db.Schema({
    "title" : {
        type: String,
        trim: true  // mongoose模式修饰符 去除左右空格
    },
    "author" : String,
    "content" : String,
    "cover" : String,
    "url" : {
        type: String,
        // 自定义修饰符（在写入数据库前对数据进行格式化） 添加http//
        set(parmas) {
            return parmas.startsWith('http') ? parmas : 'http://'+ parmas;
        }
    },
    "summary" : String,
    "date": {
        type: Date,
        default: Date.now  // 默认参数：当前时间戳
    }
});


module.exports = db.model('News', NewsSchema, 'news');