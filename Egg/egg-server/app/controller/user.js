'use strict';

const { Controller } = require('egg');

/**
 * @Controller 用户管理控制器
 */
class UserController extends Controller {

    constructor(ctx) {
        super(ctx);

    };

    /**
     * @summary 创建⽤户
     * @description 添加一个新的用户，记录⽤户账户/密码/类型
     * @router post /api/addUser
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    addUser() {
        const { ctx } = this;
        ctx.body = '666';
    };

};

module.exports = UserController;

