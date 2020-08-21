/**
 * my-cli 初始化逻辑，也就是在执行 mupiao init xxx 命令时要做的事情！ 
 */

// 异步包装模块 
const { promisify } = require('util');

// 文字放大效果模块
const figlet = promisify(require('figlet'));

// 命令行清屏模块
const clear = require('clear');

// 粉笔模块（修饰log函数，如果加颜色等）
const chalk = require('chalk');

// 重写log函数
const log = (msg) => {
    console.log(chalk.green(msg))
};


// 导入封装过的GitHub项目下载(克隆)方法！
const { clone } = require('./clone');

// 导入封装过的Npm模块依赖下载(安装)方法！
const { spawn } = require('./spawn');

// 导入封装过打开浏览器方法！
const { open } = require('./open');


module.exports = async (name) => {
    // 1、清屏
    clear();

    // 向屏幕打印欢迎内容！
    const text = await figlet('Mu Piao CLI 欢迎你！');
    console.log(chalk.bgGreen.white(text));



    // 2、CLI初始化
    log(`\n=============== 🚀开始创建【${name}】项目 ===============`);

    // 开始下载项目（注：其是 @vue/cli、create-react-app、@angular/cli 这些脚手架工具的初始化(下载)方式就是这样的，它的们代码也是放在GitHub上的）

    // await clone('github:su37josephxia/vue-template', name);

    await clone('github:MuGuiLin/veu-cli-template', name);

    // 有多个时：可再次从github中下载 
    // await clone('github:jquery/jquery', name);



    // 3、安装npm依赖
    log(`\n=================== 🚀开始安装依赖🚀 ===================`);

    // await spawn('yarn', ['install'], { cwd: `./${name}` });

    // 注：windows下npm执行名不同，所以要判断一下
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}` });
    
    console.log(chalk.magenta(`
    *********** 👌 OK 安装完成 *********** 

    ======================================
        cd ${name}      // 进入项目根目录
        npm run serve   // 启动项目
        npm run build   // 项目打包上线
    ======================================
    `));



    //4、打开浏览器
    open('http://localhost:8080');



    //5、启动项目
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'serve'], { cwd: `./${name}` });

};