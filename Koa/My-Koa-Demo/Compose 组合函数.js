/**
 * 在Koa中间件机制中，Koa中间件机制就是函数式组合概念，还有React中的redux也是同理
 * 
 * Compose的概念：简间来讲就是，将一组(多个)需要顺序执行的函数，复合(组合)成一个函数！而外层函数的参数实际上是内层函数的返回值！！！。
 * 
 * 常比喻的洋葱（洋葱圈模型），就可以很形象的表示这种机制，这也是Koa源码中的精髓和难点！
 * 
 * Compose 的N种姿势： https://github.com/su37josephxia/compose-awesome
 * 
 */


function sum(a, b) {
    return a + b;
};

function square(c) {
    return c * c;
};

// 函数组合1
function compose(a, b) {
    return square(sum(a, b));  // 写死的函数
};
// const compose = (a, b) => square(sum(a, b)); // ES6写法
console.log(compose(1, 2));  // 9 



// 函数组合2 改进一下 高级版
function compose2(fn1, fn2) {
    return function (...args) {
        return fn2(fn1(...args)); // 把函数作为参数传(类似俄罗斯套娃)，这样会灵活很多，但是只能有限的处理两个函数 
    }
};
// const compose2 = (fn1, fn2) => (...args) => fn2(fn1(...args)); // ES6写法
const com2 = compose2(sum, square);
console.log(com2(1, 2));  // 9




// 函数组合3 再改进一下 豪华版
function compose3(...[first, ...other]) {
    // console.log(first, other);
    return function (...args) {
        let ret = first(...args);
        other.forEach(function (fn) {
            ret = fn(ret)
        });
        return ret;
    }
};
// ES6写法
// const compose3 = (...[first, ...other]) => (...args) => {
//     let ret = first(...args);
//     other.forEach(function (fn) {
//         ret = fn(ret)
//     });
//     return ret;
// };
const com3 = compose3(sum, square, square, square); // 现在可以传任意个
console.log(com3(1, 2));  // 9



function fn1() {
    console.log('fn1');
};

function fn2() {
    console.log('fn2');
};

function fn3() {
    console.log('fn3');
};

// function compose(fn) {
//     fn && fn();
// };
// compose(fn1);

// function compose(...fns) {
//     fns.map((item, index, arr) => {
//         item()
//     });
// };
// compose(fn1, fn2, fn3);

// function compose(...fns) {
//     return function () {
//         fns.map((item, index, arr) => {
//             item()
//         });
//     }
// };
// compose(fn1, fn2, fn3)();


/**
 * 异步函数 
 */
async function fun1(next) {
    console.log('fun1');
    await next();
    console.log('end fun1');
};

async function fun2(next) {
    console.log('fun2');
    await next();
    console.log('end fun2');
};

async function fun3(next) {
    console.log('fun3');
    await next();
    console.log('end fun3');
};



// 洋葱圈组合函数 - 责任链模式
function composes(middleares) {
    // 返回一个新函数
    return function () {
        // 返回并执行函数的承诺
        return dispatch(0); // 从第一个开始

        function dispatch(i) {
            // 获取每个要执行的异步函数
            let fn = middleares[i];
            if (!fn) {
                // 如果没有获取到，就返回一个空承诺
                return Promise.resolve()
            } else {
                // 如果获取到了，就返回并执行承诺
                return Promise.resolve(
                    // 执行并返回next函数
                    fn(function next() {
                        // 递归调用
                        return dispatch(i + 1);
                    })
                );
            };
        };
    };
};

const middleares = [fun1, fun2, fun3];
const finalFn = composes(middleares);
finalFn();

// 调用简写
// composes([fun1, fun2, fun3])();

// compose洋葱圈的各种姿势
// https://github.com/su37josephxia/compose-awesome