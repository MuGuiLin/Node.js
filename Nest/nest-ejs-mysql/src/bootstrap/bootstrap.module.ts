import { Module } from '@nestjs/common';
import { BootstrapController } from './bootstrap.controller';
import { BootstrapService } from './bootstrap.service';

@Module({
  imports: [],
  controllers: [BootstrapController],
  providers: [BootstrapService],
})
export class BootstrapModule {}
