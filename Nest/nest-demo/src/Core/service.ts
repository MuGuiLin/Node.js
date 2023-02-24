import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
    getCore(): string {
        return '<h1 style="color:orange;text-align:center;">Get Core，我作为了公共模块用啦!</h1> <hr/>';
    };

    getAllCore(): string {
        return '<h1 style="color:purple;text-align:center;">Get All Core!</h1> <hr/>';
    }
}
