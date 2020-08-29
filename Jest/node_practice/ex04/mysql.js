
const mysql = require('mysql2');

// https://www.npmjs.com/package/mysql2

// 创建并数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',          // 数据库地址
    user: 'root',               // 账户名
    database: 'koa_ts_mysql'    // 数据名称
});

// 简单查询
connection.query('SELECT * FROM `user` WHERE `username` = "小强" AND `age` > 45',
    function (err, results, fields) {
        if (!err) {
            console.log(results);   // 结果包含服务器返回的行
            // console.log(fields);    // 字段包含有关结果的额外元数据（如果有）
        } else {
            console.log('对不起：没有找到相应的数据！');
        }

    }
);

// 带占位符的查询
connection.query(
    'SELECT * FROM `user` WHERE `username` = ? AND `age` > ?', ['小英', 20],
    function (err, results) {
        if (!err) {
            console.log(`已查找到符合条件的${results.length}条记录：`, results);
        } else {
            console.log('对不起：没有找到相应的数据！');
        }
 
    }
);

// 查询user表所有记录
connection.query(
    'SELECT * FROM `user`', 
    function (err, results) {
        if (!err) {
            console.log(`已查找到符合条件的${results.length}条记录：`, results);
        } else {
            console.log('对不起：没有找到相应的数据！');
        }
 
    }
);