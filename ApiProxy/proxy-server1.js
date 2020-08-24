const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// 代理配置
const options = {
    target: 'https://chuanliandan-test.smgtech.net/RadioManuscriptManagement', // 目标代理主机
    changeOrigin: true, // 虚拟托管站点所需
    ws: true, // 开启websockets代理
    pathRewrite: {
        '^/mupiao': '',
        // '^/api/old-path': '/api/new-path', // 改写路径
        // '^/api/remove/path': '/path', // 删除基本路径
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000',
        // 将目标 target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000': 'http://localhost:8080',
    },
};

// 创建代理上下文
const exampleProxy = createProxyMiddleware(options);

// 在Web服务器上挂载代理
const app = express();
app.use('/api', exampleProxy);
app.listen(3000);

// const express = require('express');
// const proxy = require('http-proxy-middleware');
// const app = express();

// // app.use(express.static(__dirname + '/'));
// app.use('/mupiao', proxy('https://chuanliandan-test.smgtech.net/RadioManuscriptManagement'));
// app.listen(3000, () => {
//     console.log('API接口代理已动！');
// });
