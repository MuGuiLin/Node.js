'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('News',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,          // 值自增
          primaryKey: true,             // 主键
        },
        type: {
          type: Sequelize.STRING(60),
          allowNull: true             
        },
        title: {
          type: Sequelize.STRING(120), //字符串类型
          unique: true,                // 值唯一（不能重复）
          allowNull: false             // 不能为空
        },
        author: {
          type: Sequelize.CHAR(32),   
          allowNull: true            
        },
        content: {
          type: Sequelize.TEXT,       //文本类型
          allowNull: false
        },
        readsum: {
          type: Sequelize.INTEGER,    //整数类型
          defaultValue: 0             //默认值
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
    return queryInterface.dropTable('News');
  }
};
