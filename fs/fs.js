const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
    if('/favicon.ico' == req.url){
        //因为node会单独去请求一次favicon.ico图标，所以就会出现两次请求，
        //这样做是为了减少一次请求
        return false;
    }

    let random = parseInt(Math.random() * 89999) + 10000;
    console.log('欢迎：',random);
    
    res.writeHead('200', {'Content-Type': 'text/txt; charset=UTF-8'});

    let fsObj = fs.readFile('./wb.txt', (error, data) => {
        if(error) {
            throw error;
        } else {
            console.log(random, '文件读取完毕！');
            res.end(data);
        }
    });


}).listen('5000', '172.28.125.171');

// 连接特定的 DNS 后缀: 
// 描述: Intel(R) Ethernet Connection I217-LM
// 物理地址: ‎C4-34-6B-55-FD-DC
// 已启用 DHCP: 是
// IPv4 地址: 172.28.125.171
// IPv4 子网掩码: 255.255.255.0
// 获得租约的时间: 2018年5月24日, 星期四 下午 04:31:17
// 租约过期的时间: 2018年5月24日, 星期四 下午 05:31:16
// IPv4 默认网关: 172.28.125.254
// IPv4 DHCP 服务器: 172.27.50.33
// IPv4 DNS 服务器: 172.28.10.44, 172.26.202.44
// IPv4 WINS 服务器: 172.28.10.44
// 已启用 NetBIOS over Tcpip: 是