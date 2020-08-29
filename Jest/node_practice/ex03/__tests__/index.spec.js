/* data.json文件内容
    {
        "user":"tom",
        "name":"沐枫",
        "age":29,
        "sex":"男",
        "job":"Web全栈开发",
        "hobby":"['上网', '看书', '学习', '打球', '看电影', '旅游']"
    }
*/


test('练习03 文件流实现JSON读取',async () => {
    const { parser } = require('../index');
    const josn = await parser(__dirname + '/data/data.json');
    const { user, name, job } = josn;

    console.log(josn);

    expect(user).toBe('tom');
    expect(name).toBe('沐枫');
    expect(job).toBe('Web全栈开发');
})