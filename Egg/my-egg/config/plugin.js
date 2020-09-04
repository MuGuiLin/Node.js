'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 配置egg-sequelize 数据库模块
  sequelize: {
    enable: true,
    package: "egg-sequelize"
  }
};
