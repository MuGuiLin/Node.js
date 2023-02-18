import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user';
import { UserService } from '../../services/user';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
