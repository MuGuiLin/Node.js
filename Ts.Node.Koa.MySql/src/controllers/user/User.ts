import { Controller, Get, Params, Query, Body, Post, Header } from "koa-ts-controllers";

import { IsNumber, IsNumberString, IsString } from "class-validator";

import Boom from "@hapi/boom";

import { LoginBody, RegistBody } from "../../validators/user/User";

import { User as UserModel } from "../../models/user/User";


@Controller('/user')
export class UserController {

    /**
     * 用户登录
     * @username string
     * @password string
     */
    @Get('/login')
    public async mupiao() {
        return 'OK 登录Api访问成功！';
    };

    /**
     * 用户注册
     * @param body {
     *      username
     *      password
     *      rePassword
     * }
     */
    @Post('/regist')
    async regist(@Body() body: RegistBody) {
        console.log(body);
        let {username, password } = body;

        // 先查询数据库是否存在该用户
        let user = await UserModel.findOne({
            where: { username}
        });

        if(user) {
            throw Boom.conflict('注册失败', '这个用户名已经被注册过啦！');
        }

        let newUser = new UserModel();
        newUser.username = username;
        newUser.password = password;

        await newUser.save();

        return {
            code: 100,
            id: newUser.id
        };


        // Model.create();
        // Model.update(); 
        // instance.save(); 
        // instance.update();
    };



};