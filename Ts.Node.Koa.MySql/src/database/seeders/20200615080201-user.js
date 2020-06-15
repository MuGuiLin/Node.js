'use strict';
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let md5 = crypto.createHash('md5');
    let password = md5.update('123456').digest('hex');
    let date = new Date();

    return queryInterface.bulkInsert('user', ['mupiao', 'admin', 'root'].map((name, index) => {
      return {
        id: index + 1,
        username: name,
        password,
        sex: 0.5 <= Math.random() ? '男' : '女',
        age: parseInt((Math.random() * 100)),
        job: '',
        phone: '',
        wechat: '',
        address: '',
        photo: '',
        summary: '',
        createdAt: date,
        updatedAt: date
      }
    }));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    // 清除表中所有数据
    return queryInterface.bulkDelete('user', null, {});
  }
};
