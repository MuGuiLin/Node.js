const Sequelize = require('sequelize');

test('练习04 完成一个一对多查询', async () => {

    const sequelize = new Sequelize({
        database: 'mupiao',     // 数据库名称
        username: 'root',       // 账户名称
        password: '',           // 密码
        host: 'localhost',      // 主机名称
        port: 3306,             // 端口号，MySQL默认3306
        //dialect: 'mysql',
		dialect: 'sqlite',		// SQLite 是一个软件库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。SQLite 是在世界上最广泛部署的 SQL 数据库引擎。SQLite 源代码不受版权限制。
        logging: false,         // 关闭执行日志 
        operatorsAliases: true
    });

    // 初始化表模型（映射关系）
    const { initModel } = require('../index');

    // 获取表model
    const { Product, User } = await initModel(sequelize);

    // 向user表中插入数据
    user = await User.create({
        name: 'Tom',
    });

    // 向product表中插入数据 (注：只要user表和product表建立了关系后，user.createProduct()就自动有啦！！)
    await user.createProduct({
        title: '商品一'
    });
    await user.createProduct({
        title: '商品二'
    });

    // 查询product表中所有记录
    const ret = await Product.findAll({
        attributes: ['title'] // 只返回Product 产品表中的title字段，Product.findAll()就返回所有字段
    });

    // console.log('-------------ret1', ret);
    // console.log('-------------ret2', JSON.stringify(ret));
    console.log('-------------ret3', JSON.parse(JSON.stringify(ret)));

    expect(JSON.parse(JSON.stringify(ret))).toEqual([{ "title": "商品一" }, { "title": "商品二" }]);
});