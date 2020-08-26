/**
 * getter函数 与 setter函数 可以简化对象、Api，用于数据校验等，可用在Echarts 的 option对象
 * 
 */

const obj = {
    user: {
        name: '沐枫',
        age: 29,
        job: 'Web前端'
    }
};

// 如何获取obj对象的name 属性？
console.log('一般情况下是这样获取：', obj.user.name);


// 用getter函数简化后获取， 可以叫数据代理
const obj2 = {
    user: {
        name: '沐枫',
        age: 29,
        job: 'Web前端'
    },
    get name() {
        return this.user.name
    },
    set name(val) {
        this.user.name = val;
    }
};

console.log('用getter函数简化：', obj2.name);

obj2.name = 'MuGuiLin';

console.log('一般情况下是这样获取：', obj2.user.name);
console.log('用getter函数简化：', obj2.name);

