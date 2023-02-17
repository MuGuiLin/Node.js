import { EggLogger } from "egg";
import {
  Inject,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  // HTTPQuery,
  // HTTPParam
} from "@eggjs/tegg";

@HTTPController({
  path: "/",
})
export class HomeController {
  @Inject()
  logger: EggLogger;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "/",
  })
  async index() {
    this.logger.info("hello egg logger");
    return "hello egg";
  };

  // @HTTPMethod({
  //   method: HTTPMethodEnum.GET,
  //   path: 'getQuery',
  // })
  // // http://localhost:7001/getQuery?name=沐枫&age=18
  // async getQuery(@HTTPQuery({ name: 'Name' }) Name: string) {
  //   return { Name };
  // };

  // @HTTPMethod({
  //   method: HTTPMethodEnum.GET,
  //   path: "/getParam",
  // })
  // async getParam(@HTTPParam()) {
  //   console.log(999999999, this);
  //   return `<h1>我是一个Banner列表</h1>`;
  // }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "/banner",
  })
  async banner() {
    console.log(999999999, this.logger);
    return `<h1>我是一个Banner列表</h1>`;
  }
}
