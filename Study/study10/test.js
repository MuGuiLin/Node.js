/**
 * https://www.npmjs.com/package/request
 */
const request = require('request');

setInterval(() => {

    //自动多次不断的触发请求（免得手动去触发请求，太累了！）来测试app.js
    request('http://localhost:3000', function(err, res, body) {

        console.log(body);
    });

}, 1000);