let userArr = [], userNum = [];

exports.Index = (req, res) => {
    let name = req.session.user;
    res.render('index',{
        "user": name
    });
};

exports.UserCheck = (req, res) => {
    console.log(req.body); //post接收参数

    let name = req.body.name;

    if (!name) {
        res.json({
            "status": 0, 
            "result": "昵称不能为空！"
        });
        return false;
    }
    if (0 <= userArr.indexOf(name)) {
        res.json({
            "status": 0,
            "result": "该昵称已存在！"
        });
        return false;
    }

    userArr.push(name);

    req.session.user = name;

    res.json({
        "status": 1,
        "result": "OK注册成功！"
    });

};

exports.GetUser = (req, res) => {

};

exports.OpenChat = (req, res) => {
    if(req.session.user) {
       res.render('chat', {
           "user": req.session.user
        }); 
    } else {
        res.redirect('/');
    }
};

exports.SocketIo = (ws, io) => {
    // console.log(ws);
    ws.on('login', (o) => {
        if(0 <= userNum.indexOf(o.user)) {
            console.log('用户：', userNum, '人数：', userNum.length);
        } else {
            userNum.push(o.user);
            ws.user = o.user;
        } 
        io.emit('usernum', userNum.length);
        io.emit('chat', {
            "user": o.user,
            "msg": "进入了聊天室！！",
            "time": new Date()
        });
    });
    
    ws.on('chat', (msg) => {
        console.log(msg);
        io.emit('chat', msg);
    });

    //每次都会触发
    ws.on('disconnect', () => {
        if(userNum.indexOf(ws.user)) {
            userNum.splice(userNum.indexOf(ws.user), 1);
            io.emit('chat', {
                "user": ws.user,
                "msg": "离开了聊天室！！",
                "time": new Date()
            });
        }
        io.emit('usernum', userNum.length);
    });
};