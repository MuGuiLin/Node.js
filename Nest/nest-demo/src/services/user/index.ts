import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getUser(): string {
        return '<h1 style="color:blue;text-align:center;">Get User!</h1> <hr/>';
    };

    getAllUser(): string {
        return '<h1 style="color:red;text-align:center;">Get All User!</h1> <hr/>';
    }
}
