import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
// @Module({
//   imports: [],
//   controllers: [AppController, UsersController],
//   providers: [AppService, UsersService],
// })

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
