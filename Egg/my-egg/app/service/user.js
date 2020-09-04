'use strict';

const { Service } = require('egg');

/**
 * user 业务逻辑处理
 * 这就是三层分层中的 service 层： controller -> service -> model
 */
class UserService extends Service {

    async getUser() {
        // 在这里假设已从数据库拿到数据，实际应该放在model层中
        return [{
            name: '沐枫',
            age: 29,
            text: 'UserService'
        }];

        // return await this.ctx.model.User.findOne();
    };

    async getAllUser() {
        // 一般模型层是被逻辑层调用的，所以这里就是在 service 中调用 model
        // console.log(this.ctx.model.User);

        return await this.ctx.model.User.findAll(); // findAll()是sequelize模块提供的方法 用于获取所有表中的数据
    };

    async addUser(data) {
        
        const { ctx } = this;
        const user = await ctx.model.User.create(data);
        
        // console.log(user);

        return ctx.body = {
            code: 200,
            massage: '添加成功！',
            data: user.dataValues
        }
    };

    async delUser(id) {
         
        const { ctx } = this;
        // await ctx.model.User.deleteOne({ id: id });

   
        // const user = await ctx.service.user.find(id)
        // if (!user) {
        //     ctx.throw(404, 'user not found')
        // }

        return ctx.model.User.findByIdAndRemove(id)
        
        return ctx.body = {
            code: 200,
            massage: '删除成功！',
            data: []
        }
    };

};

module.exports = UserService;