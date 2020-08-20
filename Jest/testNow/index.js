const path = require('path');

module.exports = class TestNow {

    constructor() {

    };

    /**
     * 生成测试文件名 __TESTS__下对应的测试文件名
     * @param {string} fileName 
     */
    createTestFileName(fileName) {
        // 拆分目录(获取目录名)
        const dirName = path.dirname(fileName);

        // 拆分文件(获取文件名)
        const baseName = path.basename(fileName);

        // 拆分后缀(获取扩展名)
        const extName = path.extname(baseName || fileName);

        console.log('目录：', dirName, '文件：', baseName, '后缀：', extName);

        // 用查找替换方式 给文件名加上 .spce
        const newName = baseName.replace(extName, `.spce${extName}`);

        console.log('新文件名：', newName);

        // 组装测试目录、测试文件
        return path.format({
            root: dirName + '/__TESTS__/',
            base: newName
        });
    };

    /**
     * 生成测试代码 __TESTS__下对应的测试文件中的代码
     * @param {string} methodName 
     * @param {string} className 
     * @param {boolean} isClass 
     */
    createTestCode(methodName, className, isClass = false) {

        // 返回组装模板
        return `
test('测试：${methodName}', () => {
    // 如果methodName是一个类，在获取赋值时需要解构一下才行
    const = ${isClass ? '{' + methodName + '}' : methodName} = require(../${className});
    // 执行方法
    const ret = ${methodName}();
});
`    
    }
};