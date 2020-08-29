const { resolve } = require('path');
const fs = require('fs');

const getRouter = (path = resolve('./')) => {
    // 获取指定目录下的文件
    const fileList = fs.readdirSync(path);
    console.log('指定目录下的文件：', fileList);

    // 返回 根据文件生成路由配置 
    return `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${fileList.map(file => {
return `{
    path: '/${file.replace('.vue', '')}',
    name: '${file.replace('.vue', '')}',
    component: () => import('./views/${file}')
},
`}).join('')}
    ]
})`;


// 暗号：递归

return `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${fileList.map(file =>
`{
    path: '/${file.replace('.vue', '')}',
    name: '${file.replace('.vue', '')}',
    component: () => import('./views/${file}')
},
`).join('')}
    ]
})`;
};

module.exports = { getRouter };
// replace()字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。