/**
 * npm 依赖安装
 * 安装从github克隆下来的项目的相关npm依赖！
 */

 // https://www.npmjs.com/package/child-process-promise
const { spawn } = require('child_process');

/**
 * 封装spawn模块
 * @param  {...any} args 
 */
module.exports.spawn = async (...args) => {

    // 返回一个Promise对象，
    return new Promise((resolve, reject) => {
        // 启动一个子进程 赋给ps变量，执行传进来的npm命令（如：npm install、npm start、npm run serve、npm run build等）;
        const oraPs = require('ora')();
        oraPs.start();
        const ps = spawn(...args);

        // ps子进程产生的正常输出流（正常字节流）
        ps.stdout.pipe(process.stdout);  // 为了在命令行界面上显示，所以将ps子进程 和 process主进程 通过pipe()管道进行对接！

        // ps子进程产生的错误输出流（异常字节流）
        ps.stderr.pipe(process.stderr);

        //监听ps子进程执行成功结束时
        ps.on('close', (msg) => {
            oraPs.succeed();
            resolve(msg);
        });

        //监听ps子进程执行出错时
        ps.on('error', (err) => {
            reject(err);
            oraPs.fail();
        });

        ps.on('exit', (msg) => {
            resolve(msg);
            oraPs.warn();
        });
    });
};