'use strict';

const { Controller } = require('egg');


/**
 * user 控制器
 * 这就是三层分层中的 controller 层： controller -> service -> model
 */
class UserController extends Controller {
    async index() {
        this.ctx.body = "UserController 控制器 OK!";
    };

    async getUser() {
        const { ctx } = this;

        /**
         * 注：由于当业务逻辑过于复杂后，就可以分层处理(三层：controller -> service -> model)，将业务逻辑放在专门的service目录中,将数据模型放在model目录中
         *
         * 三层架构：
         * UI(表示/表现层)。
         * BLL(业务逻辑层)。
         * DAL(数据访问层)。
         *
         * MVC模式：
         * View：视图，为用户提供使用界面，与用户直接进行交互。
         * Model：模型，承载数据，并对用户提交请求进行计算的模块。
         * Controller：控制器，用于将用户请求转发给相应的 Model 进行处理，并根据 Model 的计算结果向用户提供相应响应
         *
         */

        /**
         * 约定优于配置（convention over configuration），也称作按约定编程，是⼀种软件设计范式，旨在减少软件开发⼈员需做决定的数量，获得简单的好处，⽽⼜不失灵活性。
         * 
         * egg框架约定：它会自动加载service目录中的业务模块！即 controller 控制器 调用-> service业务逻辑。
         * 
         * 所以，只要在service目录下所有的js文件中 继承了 egg.js框架的Service模块，就可以在this.ctx.service对象下获取到service目录下以xxx命名的.js文件中方法啦！
         */
        // 获取到service目录下user.js文件中的getUser()方法
        ctx.body = await ctx.service.user.getUser();
    };

    async getAllUser() {
      
        this.ctx.body = await this.ctx.service.user.getAllUser();
    };

    async addUser() {
        const { ctx } = this;

        // POST
        // let data = JSON.stringify(ctx.request.body);

        // GET
        let data = JSON.stringify(ctx.request.query);

        // console.log(data);
        
        // data = {
        //     name: '沐枫',
        //     password: '123456',
        //     age: parseInt(Math.random() * 100)
        // };

        ctx.body = await ctx.service.user.addUser(ctx.request.query);
    };
    
    async delUser() {
        const { ctx } = this;

        ctx.body = await ctx.service.user.delUser(ctx.request.query.id);
    }

};

module.exports = UserController;