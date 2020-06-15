import { Length, IsNotEmpty } from "class-validator";

export class LoginBody {

    @Length(1, 50, {
        message: '对不起：用户名长度必须 在1到50之间！'
    })
    username: string;

    @IsNotEmpty({
        message: '对不起：密码不能为空！'
    })
    password: string;

};

export class RegistBody {

    @Length(1, 50, {
        message: '对不起：用户名长度必须 在1到50之间！'
    })
    username: string;

    @IsNotEmpty({
        message: '对不起：密码不能为空！'
    })
    password: string;

    // class-validator模块没提供，需自定义（必须要和上面的密码相同）
    @IsNotEmpty({
        message: '对不起：密码不能为空！'
    })
    rePassword: string;
};