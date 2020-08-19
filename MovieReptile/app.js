
// 用于发起请求 https://www.npmjs.com/package/request
const request = require('request');

// 用于 字符转编码 https://www.npmjs.com/package/iconv-lite
const iconv = require('iconv-lite');

// 用于， 当相于后端的jquery   https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio')

// 封装一下request

function Ajax(url, callBack) {
    const opts = {
        encoding: null
    };

    request(url, opts, callBack);
};

// https://www.ygdy8.net/html/gndy/jddy/20200722/60250.html
Ajax('https://www.ygdy8.net/html/gndy/jddy/20200204/59654.html',
    function (error, response, body) {
        // console.log(response, body);

        // 字符转码 得到html
        const html = iconv.decode(body, 'gb2312');
        // console.log(html);

        // 爬取html中指的标签内容
        const $ = cheerio.load(html);
        // console.log($('.title_all h1').text());
        // console.log($('a').attr('href'));

        $('a').map((i, o, a) => {
            console.log($(o).attr('href'))
            // console.log(o, i, a)
        })

    }
);
