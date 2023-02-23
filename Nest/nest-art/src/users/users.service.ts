import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(par?) {
    return 'User' + par;
  }
}
