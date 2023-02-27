import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(uid, age = 18) {
    return {
      code: 200,
      data: {
        uid,
        age: Number(age),
      },
      massage: '从数据库获取单条用户信息成功！',
    };
  }
}
