const { createToken } = require('../index');

/**
 *  在线base64解密工具：(采用Crypto-JS实现) https://tool.oschina.net/encrypt?type=3
 *  token用.分隔的前两个字符串可用base64解密出来：
 */
//                                                                                                           2020/6/12 11:51:12,      2020/6/12 10:51:12
//                                  {"alg":"HS256","typ":"JWT"}.{"data":{"username":"abc","password":"111111"},"exp":1591933872,"iat":1591930272}
const token = createToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTkxOTMzODcyLCJpYXQiOjE1OTE5MzAyNzJ9.oKAj1dYjiHaNmKB4l5hUU84yycwZMIMLg47Rt5QxKFQ');


test('练习06-1 有效性验证', () => {
                  //token.getExp() === 1591933872                                         
    expect(new Date(token.getExp() * 1000).toISOString()).toBe('2020-06-12T03:51:12.000Z');
});

test('练习06-2 JWT有效期和有效性验证', () => {

    expect(token.verify('12345678')).toBe(true);
}); 