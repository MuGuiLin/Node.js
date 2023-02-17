var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];


app.use('/', express.static(__dirname + '/'));
server.listen(8088);

io.sockets.on('connection', (socket) => {
    // 失去连接
    socket.on('disconnect', function () {
        if (users.indexOf(socket.username) > -1) {
            users.splice(users.indexOf(socket.username), 1);
            console.log(socket.username + '===>disconnected');
        }

        socket.broadcast.emit('users', {
            number: users.length
        });
    });

    socket.on('message', function (data) {
        let newData = {
            text: data.text,
            user: socket.username
        }
        socket.emit('receive_message', newData);
        socket.broadcast.emit('receive_message', newData);
    });


    socket.on('login', function (data) {
        if (users.indexOf(data.username) > -1) {

        } else {
            socket.username = data.username;
            users.push(data.username);
            // 统计连接数
            socket.emit('users', {
                number: users.length
            }); // 发送给自己
            socket.broadcast.emit('users', {
                number: users.length
            }); // 发送给其他人
        }

    });

});


console.log('服务器运行于：localhost:8088');


ctx {
    event: 'message',
    data: { content: '我是打酱油的！' },
    socket: Socket {
      _events: [Object: null prototype] {
        message: [Function],
        disconnect: [Function]
      },
      _eventsCount: 2,
      _maxListeners: undefined,
      nsp: Namespace {
        _events: [Object: null prototype],
        _eventsCount: 1,
        _maxListeners: undefined,
        sockets: [Map],
        _fns: [],
        _rooms: Set {},
        _flags: {},
        _ids: 0,
        server: [Server],
        name: '/',
        adapter: [Adapter],
        [Symbol(kCapture)]: false
      },
      client: Client {
        sockets: [Map],
        nsps: [Map],
        server: [Server],
        conn: [Socket],
        encoder: Encoder {},
        decoder: [Decoder],
        id: 'ucVr8dNJKn-RDhmqAAAC',
        onclose: [Function: bound onclose],
        ondata: [Function: bound ondata],
        onerror: [Function: bound onerror],
        ondecoded: [Function: bound ondecoded],
        connectTimeout: undefined
      },
      acks: Map {},
      fns: [],
      flags: {},
      _rooms: Set {},
      server: Server {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        _nsps: [Map],
        parentNsps: Map {},
        _path: '/socket.io',
        clientPathRegex: /^\/socket\.io\/socket\.io(\.min|\.msgpack\.min)?\.js(\.map)?$/,
        _connectTimeout: 45000,
        _serveClient: true,
        _parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        sockets: [Namespace],
        opts: {},
        eio: [Server],
        httpServer: [Server],
        engine: [Server],
        [Symbol(kCapture)]: false
      },
      adapter: Adapter {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        nsp: [Namespace],
        rooms: [Map],
        sids: [Map],
        encoder: Encoder {},
        [Symbol(kCapture)]: false
      },
      id: '3MK5nfQHUCN0I2svAAAD',
      connected: true,
      disconnected: false,
      handshake: {
        headers: [Object],
        time: 'Wed Jan 13 2021 16:09:31 GMT+0800 (GMT+08:00)',
        address: '127.0.0.1',
        xdomain: false,
        secure: false,
        issued: 1610525371861,
        url: '/socket.io/?EIO=4&transport=polling&t=NRwokss',
        query: [Object: null prototype],
        auth: {}
      },
      _on: [Function],
      update: [Function],
      [Symbol(kCapture)]: false
    },
    acknowledge: undefined
  }