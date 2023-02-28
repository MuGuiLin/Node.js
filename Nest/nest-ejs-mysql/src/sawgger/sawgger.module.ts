import { Module } from '@nestjs/common';
import { SawggerController } from './sawgger.controller';
import { SawggerService } from './sawgger.service';

@Module({
  imports: [],
  controllers: [SawggerController],
  providers: [SawggerService],
})
export class SawggerModule {}
