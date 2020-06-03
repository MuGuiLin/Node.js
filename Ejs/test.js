//引用第3方ejs模板引擎 模块
const ejs = require('ejs');

//模板
let dom = "<h1>你好我叫：<%= name %>， 今年<%= age %>岁，是一个<%= job %>工程师！</h1>";

let name = `<% if (user) { %>
                <h2><%= user.name %></h2>
            <% } %>`;

// 数据
let data = {
    name : "沐枫自然",
    age: 26,
    job: "Web前端开发",
    user: {
        name: "mupiao"
    }
}

dom += name;

//数据绑定
var template = ejs.render(dom, data);

console.log(template, '学习ejs模板引擎网址：https://www.npmjs.com/package/ejs');