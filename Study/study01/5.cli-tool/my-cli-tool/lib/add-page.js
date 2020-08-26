const fs = require('fs');
const handlebars = require('handlebars');


module.exports = async (pageName) => {
    
    /**
     * 编译模板
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件路径
     * @param {*} templatePath 模板文件路径
     */
    const compile = (meta, filePath, templatePath) => {
        // 先判断 模板文件是否存在（注：这个模板文件是需要在vue项目根目录中和src同级目录的template文件夹下面自已先写好的【由于各项目需求不同所以要自己去写】）
        if (fs.existsSync(templatePath)) {
            // 同步获取要编译的模板文件（由fs.readFileSync()方法取出来的是流，所以要将其转为字符串）
            const content = fs.readFileSync(templatePath).toString();
            // console.log(content);


            // 用handlebars模板编译引擎，将模板文件字符串，编译为 真正的模板文件（编译后的结果赋给template变量）
            const template = handlebars.compile(content)(meta);
            // console.log(template);


            // 同步将编译好的模板 写入到 指定目录
            fs.writeFileSync(filePath, template);

            console.log(`${filePath} ———— 创建成功！`);
        }
    };


    // 获取vue项目src/views中的页面文件
    const vueList = fs.readdirSync('./src/views').filter(item => item !== 'Home.vue').map((vuePage) => {
        return {
            name: vuePage.replace('.vue', '').toLowerCase(), // 得到文件名并去掉后缀，为了一至性都转为小写
            file: vuePage
        }
    });

    createVuePage = async (meta) => {
        const content = `<template>
    <section class="page">
        <h1>这是{{name}}页面</h1>
    </section>
</template>

<script>
export default {
    name: '{{name}}',
    components: {},
    data() {
        return {
            key: 0
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    
    methods: {
        fun() {
            
        }
    },
}
</script>

<style lang="less" scoped>
    .page{
        box-sizing: border-box;
    }
</style>`;
       
        const template = handlebars.compile(content)(meta);

        fs.writeFileSync(`./src/views/${meta.name}.vue`, template);

        console.log(`${meta.name} 页面创建成功！`);
    };

    // 生成页面
    await createVuePage({ name: pageName })

    // 生成路由
    compile({ vueList }, './src/router/index.js', './template/router.js.hbs');

    // 生成菜单
    compile({ vueList }, './src/App.vue', './template/App.vue.hbs');
};