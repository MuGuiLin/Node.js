'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 
 * https://eggjs.org/zh-cn/basics/router.html
 */
module.exports = app => {
  const { router, controller } = app;

  app.beforeStart(async () => {
    // 示例：启动的时候去读取 https://registry.npm.taobao.org/egg/latest 的版本信息
    const result = await app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.logger.info('Egg latest version: %s', result.data.version);
  });

  router.get('/', controller.home.index);

  router.get('/user', controller.user.index);

  router.get('/getUser', controller.user.getUser);
  router.get('/addUser', controller.user.addUser);
  router.get('/delUser', controller.user.delUser);

  router.get('/getAllUser', controller.user.getAllUser);

  //注意：配置动态路由后，必须传值，否则访问不到！
  router.get('/getUser/:id', controller.user.getUser);

  // 内部重定向
  router.redirect('/home', '/home/index', 302);

  // 外部重定向
  // router.redirect(`http://cn.bing.com/search?q=${666}`);

};
