/**
 * 下载、克隆项目
 * 根据传入的代码克隆地址 和 存放目录，经过添加状态提示效果后，执行下载克隆动作！
 */

const { promisify } = require('util');
const chalk = require('chalk');

/**
 * 封装download模块
 * @param {string} url 远程代码克隆地址 
 * @param {string} path 下载代码存放目录
 */
module.exports.clone = async (url, path) => {

    // 下载模块 将download-git-repo包装也promise对象
    const download = promisify(require('download-git-repo'));

    // 命令运行标识模块 （状态提示）
    const ora = require('ora');

    const process = ora(chalk.magenta(`vue/cli v4.5.4 正在下载------> ${url}`));

    // 启动下载状态提示（就是有一个/ 在转圈圈。。。）
    // process.start('开始');
    process.start();

    // 执行下载
    await download(url, path);

    // 当上面执行下载完成后，提示成功状态变成：✔
    // process.succeed('成功');
    process.succeed();
};