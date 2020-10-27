const fs = require('fs');
const formidable = require('formidable');

let removeDir = (lick) => {
    fs.unlink(lick, (err) => {
        console.log(lick, '删除成功!');
    });
};

//删除文件
let emptyDir = function(fileUrl, CallBack){
    var files = fs.readdirSync(fileUrl);//读取该文件夹

    files.forEach(function(file, i){
        console.log(i, files.length)
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
            console.log("删除文件"+fileUrl+'/'+file+"成功");
        }
        if(i == (files.length - 1)) {
            CallBack()
        }

    });
}

exports.RemoveDirs = (req, res) => {
    let path = './upload/'+ req.params.id
    emptyDir(path, function() {
        fs.rmdir(path, (err) => {
            res.json({"code" : 1});
            console.log(path, '删除文件成功!');
        });
    })
    
};

exports.GetFileBox = (CallBack) => {
    
    fs.readdir('./upload', (err, box) => {
        var Arr = [];
        (GetBoxArr = (i) => {
            if(i == box.length) {
               CallBack(Arr);
            } else {
                fs.stat('./upload/'+ box[i], (err, type) => {
                    if(type.isDirectory()) {
                        Arr.push(box[i]);
                    }
                    GetBoxArr(i + 1);
                });   
            }
        })(0);
    });
};

exports.GetFiles = (path, CallBack) => {
    let imgPath = './upload/'+ path;
    
    fs.readdir(imgPath, (err, box) => {
        if(err) {
            CallBack(null);
        } else {
            var Arr = [];
            (GetFilsArr = (i) => {
                if(i == box.length) {
                CallBack(Arr);
                } else {
                    fs.stat(imgPath +'/'+ box[i], (err, type) => {
                        if(type.isFile()) {
                            Arr.push(box[i]);
                        }
                        GetFilsArr(i + 1);
                    });   
                }
            })(0); 
        }
    });
};

exports.UploadImage = (req, res) => {
    let form = new formidable.IncomingForm();

    form.uploadDir = "./upload";

    form.parse(req, function (err, fields, files) {

        //上传后为命名的文件
        var filesPath = files.photo.path;

        console.log(files)

        var size = parseInt(files.photo.size) / (1024 * 1024);

        if(size > 2) {
            removeDir(filesPath);
            res.send('文件应小于2MB');
        };

        //              新建的相册名                        选择的相册名
        var dirName = fields.newName ? fields.newName : fields.oldName;

        //如果有新的相册名
        if (fields.newName) {
            fs.mkdir('./upload/' + dirName, (err) => {
                if (!err) {
                    console.log(dirName, `目录创建成功！`);
                }
            });
        }

        var oldpath = files.photo.path;
        console.log('------------------------------',files.photo.length)

        var newpath = `./upload/${dirName}/` + files.photo.name;

        if(files.photo.name) {
            fs.rename(oldpath, newpath, (err) => {
                if (err) {
                    removeDir(filesPath);
                    res.send('上传文件重命名失败！');
                } else {
                    res.send('OK 上传成功！');
                }
            });
        } else {
            removeDir(filesPath);
            res.send('没有上传文件！');
        }

    });
};