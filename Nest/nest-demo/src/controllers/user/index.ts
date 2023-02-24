import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../services/user';
import { CoreService } from '../../Core/service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly coreService: CoreService) { }

    @Get()
    getUser(): string {
        return this.userService.getUser();
    };

    @Get('/all')
    getAllUser(): string {
        return this.userService.getAllUser();
    };

    @Get('/core')
    getCore(): string {
        return '我是在user模块中引用了外向暴露的CoreService方法' + this.coreService.getCore();
    }
}
