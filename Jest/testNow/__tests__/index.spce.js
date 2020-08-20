const testNow = require('../index');

test('测试 自动生成对应的测试文件名', () => {
    let src = new testNow();

    let ret = src.createTestFileName('/mupiao/demo.js');

    expect(ret).toBe('/mupiao/__TESTS__/demo.spce.js'); // 希望得行的结果
});

test('测试生成代码', () => {
    let src = new (require('../index'))();

    let ret = src.createTestCode('myFun', 'class', false);

    console.log(ret);

    expect(ret).toBe(`
test('测试：myFun', () => {
    // 如果methodName是一个类，在获取赋值时需要解构一下才行
    const = myFun = require(../class);
    // 执行方法
    const ret = myFun();
});
`);
});


