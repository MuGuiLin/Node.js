'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('User',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,        // 值自增
          primaryKey: true,           // 主键
        },
        username: {
          type: Sequelize.STRING(50), //字符串类型
          unique: true,               // 值唯一（不能重复）
          allowNull: false            // 不能为空
        },
        password: {
          type: Sequelize.STRING(32),
          allowNull: false
        },
        sex: {
          type: Sequelize.CHAR(8),     //字符类型
          defaultValue: '男'
        },
        age: {
          type: Sequelize.CHAR(3),
          defaultValue: '0'
        },
        job: {
          type: Sequelize.STRING(32),
          allowNull: true
        },
        phone: {
          type: Sequelize.STRING(11),
          allowNull: true
        },
        wechat: {
          type: Sequelize.STRING(32),
          allowNull: true
        },
        address: {
          type: Sequelize.STRING,     //varchar 255
          allowNull: true
        },
        photo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        summary: {
          type: Sequelize.TEXT,       //文本类型
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,       //日期类型
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        charset: 'utf8mb4'
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('User');
  }
};
