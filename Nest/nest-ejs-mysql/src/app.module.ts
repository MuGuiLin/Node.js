import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { AdminModule } from './admin/admin.controller';
// import { AdminService } from './admin/admin.service';
// @Module({
//   imports: [],
//   controllers: [AppController, AdminModule],
//   providers: [AppService, AdminService],
// })

import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { SawggerModule } from './sawgger/sawgger.module';

@Module({
  imports: [
    AdminModule,
    UsersModule,
    NewsModule,
    BootstrapModule,
    SawggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
