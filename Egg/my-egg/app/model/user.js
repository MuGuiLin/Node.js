'use strict';

/**
 * user 数据操作模型
 * @param {Object} app对象
 * 
 * 这就是三层分层中的 model 层： controller -> service -> model
 */
module.exports = (app) => {

    const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

    // const User = app.module.define([
    //     'require',
    //     'dependency'
    // ], function(require, factory) {
    //     'use strict';

    // });

    // 建立user表模型
    const User = app.model.define('user', {
        name: STRING(30),
        age: INTEGER,
        sex: STRING(4),
        password: STRING(32),
        hobby: STRING,
        email: STRING, 
        summary: TEXT,
        // avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm' },
        // created_at: DATE,
        // updated_at: DATE,
    }, {
        timestamps: true
    });

    // 同步到数据库(强制同步) 注：一般情况下不会写在这里
    User.sync({
        force: true
    });

    // 返回 User数据模型对象
    return User;
};