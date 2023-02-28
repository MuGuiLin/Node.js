import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      title: 'Hello Next、Ts、Sawgger、MySQL、Ejs、Less、Bootstrap!',
    };
  }
}
