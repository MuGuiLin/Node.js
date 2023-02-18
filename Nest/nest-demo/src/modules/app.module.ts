import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

// 模块1
import { UserController } from '../controllers/user';
import { UserService } from '../services/user';

// 模块2
import { CoreModule } from '../Core';

@Module({
  imports: [
    // 在这里只需导入一次对应模块的Module，就不用在下面的controllers和providers中分开导入对应模块的controllers和services啦！
    CoreModule,
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
  ],
  exports: []
})

export class AppModule { };
