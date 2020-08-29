test('练习05 订阅发布实现', (done) => {
    const mockFn = jest.fn(); // jest.fn() 返回一个mock 函数

    const Connection = require('../index');
    const conn = new Connection();

    // 订阅连接回调
    conn.onConn(mockFn);
    conn.onConn(mockFn);

    // 触发发布连接
    setTimeout(() => {
        conn.connection('连接1完成');
    }, 100);

    setTimeout(() => {
        conn.connection('连接2完成');
    }, 100);

    setTimeout(() => {
        const calls = mockFn.mock.calls;

        console.log(mockFn.mock, calls);
        console.log(mockFn.mock.calls.length);

        expect(calls.length).toBe(4);           // mockFunc.mock.calls.length 函数被调用后，length 增加

        expect(calls[0][0]).toBe('连接1完成');   // mockFunc.mock.calls[0][0] 第一次调用的传入的第一个参数
        expect(calls[1][0]).toBe('连接1完成');
        expect(calls[2][0]).toBe('连接2完成');
        expect(calls[3][0]).toBe('连接2完成');

        done(); //异步回调 在当 Jest 运行至代码尾部即结束时，此时无法等到异步的回调函数被调用，因此 test 的箭头函数需加上参数done函数
    }, 500);
});