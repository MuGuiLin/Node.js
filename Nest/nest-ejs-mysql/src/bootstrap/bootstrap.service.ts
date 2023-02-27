import { Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapService {
  getData(data) {
    return {
      code: 200,
      data,
      massage: '从数据库获取数据成功！',
    };
  }
}
