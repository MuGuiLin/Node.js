const ws = require('ws');

//const wss = new ws.Server({ listen:'127.0.0.1',  port: 3000 });

//const wss = new ws.Server({ listen:'132.232.68.123',  port: 3000 });

const wss = new ws.Server({

    port: 3000
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    setInterval(() => {
		ws.send(`时间戳：${new Date().getTime()}，随机数：${Math.random()}`);
    }, 1000);
    
});

setInterval(() => {
    console.log('监听3000端口！', new Date().getTime());
}, 3000);
