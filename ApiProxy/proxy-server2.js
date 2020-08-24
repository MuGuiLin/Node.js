var httpProxy = require('http-proxy');

// var proxy = httpProxy.createProxyServer(options);

httpProxy.createProxyServer({
    target: 'https://chuanliandan-test.smgtech.net/RadioManuscriptManagement',
    ws: true,
    changeOrigin: true,
}).listen(8000, () => {
    console.log('API接口代理已动！');
}); 
