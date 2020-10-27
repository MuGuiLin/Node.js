const express = require('express');
const router = require('./controller');
const fs = require('fs');

let app = express();

//设置ejs模板引擎
app.set('view engine', 'ejs');

//文件静态化
app.use(express.static('./static'));

app.use(express.static('./upload'));

//首页
app.get('/', router.IndexInit);

//详情页
app.get('/:path', router.OpenPhoto);

//后台管理页
app.get('/admin', router.UploadImgAdmin);

//上传接口
app.post('/upload', router.UploadImgApi);

//删除相册接口
app.get('/deldir/:id', router.RemoveDirApi);

//删除相片接口
app.get('/delimg/:id', router.RemoveImgApi);

//404
app.use((req, res) => {
    res.render('404');
});

app.listen('666', '127.0.0.6');
