import { Controller, Get } from "koa-ts-controllers";

@Controller('/test')
export class TestClass {

    @Get('/hello')
    async hello() {
        return `<h1>OK 测试Api接口调用成功！`;
    }
}