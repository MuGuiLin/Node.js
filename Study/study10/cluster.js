/**
 * 测试 有效利用 CPU 多核心
 * 多核利用，多个进程共享一个端口，可以用于故障恢复等。
 * 
 * cluster http://nodejs.cn/api/cluster.html#cluster_cluster
 * cluster 模块：单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。 这里用来启动多个进程
 * 
 * os http://nodejs.cn/api/os.html#os_os
 * os 模块提供了与操作系统相关的实用方法和属性
 * 
 * process http://nodejs.cn/api/process.html#process_process
 * process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。 作为全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()。
 */

const cluster = require('cluster');
const os = require('os');

const cupNum = os.cpus().length; // os.cpus()返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
console.log(`当前电脑CPU是：${cupNum} 核的！`);

const process = require('process');

let workers = {};

if(cluster.isMaster) {
    // 主进程 （一般第一次调用，都是主进程）
    for (let i = 0; i < cupNum; i++) {
        let worker = cluster.fork();
        let pid = worker.process.pid;

        console.log('init .. pid：', pid);
        workers[pid] = worker;  
    };

    console.log('workers',workers)

    // 监听进程出现异常退出时
    cluster.on('exit', (worker, code, signal) => {
        console.log('工作进程 %d 关闭，重启中。。。', worker.process.pid);
        delete workers[worker.process.pid];

        // 复制一个新的
        worker = cluster.fork();
        workers[worker.process.pid] = worker;
    });
} else {
    // 工作进程

    let app = require('./app');
    app.listen(3000, () => {
        console.log('工作进程 3000 端口已启动！');
    });
};

// 监听关闭信号 如：Ctrl + C 关闭终端(命令窗口)时，杀死workers中进程
process.on('SIGALRM', () => {
    for (let pid = 0; pid < workers.length; pid++) {
       process.kill(pid);
    };
    // 在关闭主进程之前，先把子进程杀死
    process.exit(0);
});

// 启动测试请求
require('./test');