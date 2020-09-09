# 部署_nginx_pm2_docker

---

**使用pm2+nginx部署koa2(https)** 

参考文档：https://www.zhaofinger.com/detail/5

## 如何构建一个高可用的node环境 

> ## 主要解决问题 
>
> - 故障恢复 
> - 多核利用 
> - 多进程共享端口
> - http://www.sohu.com/a/247732550_796914 

```js
// cluster.js
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

```



##   cluster（集群）

**使用文档：**http://nodejs.cn/api/cluster.html#cluster_cluster

> 单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。
>
> `cluster` 模块可以创建共享服务器端口的子进程。



## nginx

> - 静态资源
>
> - location 动态数据请求proxy 
>
> - 负载均衡

```js
const http = require("http");
```

### koa中的session

```shell
安装： npm i koa-session -S
```



##   pm2

> 



## docker

> 