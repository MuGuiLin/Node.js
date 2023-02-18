import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="color:blue;text-align:center;">Hello Nest World!</h1> <hr/>';
  }
}
