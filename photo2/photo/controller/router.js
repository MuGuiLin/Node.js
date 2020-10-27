let file = require('../models/file.js');

exports.IndexInit = (req, res) => {
    
    file.GetFileBox((boxArr) => {
        res.render('index', {
            "boxArr": boxArr
        });
    });
    
};

exports.OpenPhoto = (req, res, next) => {
    let path = req.params.path;

    file.GetFiles(path, (imgArr) => {
        if(imgArr) {
            res.render('info', {
                "imgArr": imgArr
            }); 
        } else {
            next();
        }
        
    });
   
};

exports.UploadImgAdmin = (req, res) => {
     file.GetFileBox((boxArr) => {
        res.render('upload', {
            "boxArr": boxArr
        });
    });
};

exports.UploadImgApi = (req, res) => {
    file.UploadImage(req, res);
};

exports.RemoveDirApi = (req, res) => {
    file.RemoveDirs(req, res);
};

exports.RemoveImgApi = (req, res) => {
    var id = req.params.id;
    res.json(id);
};