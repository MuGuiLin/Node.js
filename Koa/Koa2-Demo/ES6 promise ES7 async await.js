
/** Promise对象 ES6   Promise => 承诺
 * 
    1、promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
    2、并未剥夺函数return的能力，因此无需层层传递callback，进行回调获取数据
    3、代码风格，容易理解，便于维护
    4、多个异步等待合并便于解决
 

 ** Promise参数（resolve, reject）
    1、resolve作用是，
        将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

    2、reject作用是，
        将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。


 ** Promise对象有三个状态：
    1、pending[待定]初始状态
    2、fulfilled[实现]操作成功
    3、rejected[被否决]操作失败


 ** 注：当Promise状态发生改变，就会触发then()里的响应函数处理后续步骤，而且Promise状态一经改变，不会再变。
    

 ** Promise对象的状态改变，只有两种可能：
    1、从pending变为fulfilled
    2、从pending变为rejected。


    这两种情况只要发生，状态就凝固了，不会再变了。

 */

 function getData() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if(0.5 < Math.random()) {
                resolve('成功！');
            } else {
                reject('失败！');
            }
        }, 3000)
    })
 };

 getData().then((res)=>{
    console.log('\n', res);
    
 }, (rej) => {
    console.log('\n', rej);
 })











// async 让方法变成异步(Promise)方法 和 await 等待异步方法执行完成（相当于从异步 转 同步） ES7

// 以前普通方法
function fun1() {
    return '我是一条数据';
};

console.log('\n', fun1());  // 我是一条数据



// async 让方法变成异步方法(在方法前加上async 这个方法是一个Promise方法了)
async function fun2(resolve, reject) {
    // console.log(resolve, reject) 注：fun2 虽然是一个Promise方法，但是在这里没有resolve, reject ！！！！
    return '我是一条数据666';
};

console.log('\n', fun2());  // Promise { '我是一条数据' }


// 获取async异步方法的数据方式1：
let d = fun2();
d.then((res) => {
    console.log('then：', res);

});

// 获取async异步方法的数据方式2 ：
// 用await（ES7），等待异步方法执行完成（相当于从异步 转 同步），可以获取异步方法中的数据（注：await必须要用在异步方法中[因为await会让程序停止或堵塞]，所以async 和 await 经常一起使用！）

async function get() {
    let p = await fun2();
    console.log('\n', '我是用await获取async的：', p)
}

get();


// 解析await 把异步执行 改成 同步执行

let myFun = async () => {

    console.log('第2步！');
    return '解析await 把异步执行 改成 同步执行'
};

let myGet = async () => {

    console.log('第1步！');
    let m = await myFun();

    console.log('\n', m);
    console.log('\n','第3步！因为要等await 第2步 返回');
    
}

// console.log(myFun());
myGet();




// 用 await 获取 Promise 的数据
function getData2(s = 6000) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if(0.5 < Math.random()) {
                resolve('成功666！');
            } else {
                reject('失败777！');
            }
        }, s)
    })
 };

 // 正常获取Promise数据
 getData2().then((res)=>{
    console.log('\n正常获取Promise数据：', res);
    
 }, (rej) => {
    console.log('\n正常获取Promise数据：', rej);
 })


 // 用await获取Promise数据
 async function myData() {
    let m = await getData2(9000);   // 再次提醒，await 一定要在异步方法（async） 中执行！！！
    console.log('\n用await获取Promise数据：', m)
 };
 myData();

