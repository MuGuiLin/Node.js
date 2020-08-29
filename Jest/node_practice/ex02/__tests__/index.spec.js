
test('练习02 中间件的实现', () => {

    //创建虚拟函数
    const mockFn = jest.fn();

    // 存储中间件
    const middlewares = [
        // 中间件1
        async next => {
            // 记录mockFn()调用过程
            mockFn('1 start');
            next();
            mockFn('1 end');
        },
        // 中间件2
        async next => {
            mockFn('2 start');
            next();
            mockFn('2 end');
        },
        // 中间件3
        async next => {
            mockFn('3 start');
            next();
            mockFn('3 end');
        }
    ];

    // 导入组合(聚合、合成)函数
    const { compose } = require('../index');

    // 将中间件传入组合函数 并 执行调用
    compose(middlewares)();

    const calls = mockFn.mock.calls;

    // 断言 calls 长度
    expect(calls.length).toBe(6);

    // 断言 中间件程行过程 与 结果
    expect(calls[0][0]).toBe('1 start');
    expect(calls[1][0]).toBe('2 start');
    expect(calls[2][0]).toBe('3 start');
    expect(calls[3][0]).toBe('3 end');
    expect(calls[4][0]).toBe('2 end');
    expect(calls[5][0]).toBe('1 end');
});