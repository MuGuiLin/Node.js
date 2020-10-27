const db = require('../models/db');

exports.insert = (req, res, next) => {
    let data = {
        name: '沐枫自然',
        sex: '先生',
        age: 28,
        job: 'NodeJs开发工程师',
        time: new Date(),
    },
        //插入方式1 用new 然后再 save()
        users = new db.users(data);
        users.save(() => {
            res.send('OK 存储成功：' + data);
        });
    
};

exports.draftInsert = (req, res, next) => {
    let data = {
        id: 20,
        name: 'mupiao',
        title: '离岛免税政策实施七周年 销售额超375亿元',
        cover: 'http://iniditordev.smgtech.net/Upload/iditor/covers/2018/04/24/covers1524553828606908035.jpeg',
        step: 4,
        time: new Date(),
    };
    
    //插入方式2 不用new 直接调create方法（自带save()）
    db.draft.create(data, (err) => {
        if(!err){
            res.render('draft', {
                data: data
            });
        }
    });
    
};

exports.draftFind = (req, res, next) => {

    let data = req.query.name ? {name: req.query.name} : {};

    //调用 draft的静态 insert查询方法
    db.draft.insert(data, (err, ret) => {
        if(!err){
            res.render('draft', {
                data: ret
            });
        }
    });
    
};

exports.draftUpdate = (req, res, next) => {

    let data = {
            name: req.query.name
        },
        updata = {
            $set: {
                cover: req.query.img
            }
        };

    console.log(data, updata);

    //调用 draft的静态 update修改方法
    db.draft.updata(data, updata, {}, (err, ret) => {
        if(!err){
            db.draft.insert({}, (err, ret) => {
                if (!err) {
                    res.render('draft', {
                        data: ret
                    });
                }
            });
        }
    });
    
};