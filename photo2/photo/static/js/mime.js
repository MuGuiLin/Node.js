let fs = require('fs');

exports.getMime = function (par, callback) {
    fs.readFile('../json/mime.json', (err, josn) => {
        if (err) {
            throw Error('没有找到 MIME.json文件！');
        } else {
            let data = JSON.parse(josn);
            let mime = data[par] || `text/plain;`;

            //执行回调函数，并把得到的mime类型传过去
            callback(mime);
        }
    });
};