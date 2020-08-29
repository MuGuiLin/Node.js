
test('练习01 自动化生成路由配置', () => {
    const { getRouter } = require('../index');

    // 调用 getRouter(传入文件目录) 返回路由配置
    const ret = getRouter(__dirname + '/data');

    // 断言 expect(ret).toBe(Object.is) 使用 Object.is 来测试是否完全相等
    // expect(得到的结果).toBe(希望的结果)
    
    // expect(getRouter(__dirname + '/data')).toBe(
    expect(ret).toBe(`
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
{
    path: '/about',
    name: 'about',
    component: () => import('./views/about.vue')
},
{
    path: '/index',
    name: 'index',
    component: () => import('./views/index.vue')
},

    ]
})`);

});