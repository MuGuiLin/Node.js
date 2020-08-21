#!/usr/bin/env node

// 说明：#!/usr/bin/env node  表示指定脚本解释器为node
// console.log('测试打印输出，OK 看到此信息，就表示自定义的 CLI工具 的基本环境就搭建好啦！');

const commander = require('commander');

// 定制命令行界面
// commander.version('1.0.0'); // mupiao -V 
commander.version(require('../package.json').version); // mupiao -V 

//定制init命令
commander.command('init <name>').description('初始化vue项目 - 版本：vue/cli 4.5.4').action((name) => {
    // console.log(name);

    // 初始化项目
    const init = require('../lib/init');
    init(name);
});

//定制add命令
commander.command('add <name>').description('添加xxx').action((name) => {
    console.log(name);
});

//定制del命令
commander.command('del <name>').description('删除xxx').action((name) => {
    console.log(name);
});

// 执行当前进程
commander.parse(process.argv);