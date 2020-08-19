// 导入要测试的js文件
const { msg, sum } = require('../index');

// 测试1
test('我是测试标题：测试msg中的内容是否正常输出！', () => {

    // 测试输出msg
    console.log(msg);

});

// 测试2
test('测试：用求和函数 sum() 3 + 2 是不是等5！', () => {

    // 用断言方式，使用 expect 和 toBe 来测试两个值完全相同。 若要了解Jest关于测试方面更多的能力，请参阅 Using Matchers。

    // 测试sum函数 - 测试用例(如果 expect()执行的结果和toBe()中的值相等，就测试通过)
    expect(sum(3, 2)).toBe(5);

    console.log('输出sum()结果：', sum(3, 2));
});
