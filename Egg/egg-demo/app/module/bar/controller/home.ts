import { EggLogger } from "egg";
import {
  Inject,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
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

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "/banner",
  })
  async banner() {
    console.log(999999999,this);
    return `<h1>我是一个Banner列表</h1>`;
  }
}
