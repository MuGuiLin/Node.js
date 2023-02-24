import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      title: 'Hello Next、Ts、MySQL、Ejs、Less、Bootstrap!',
    };
  }
}
