import { Controller, Get, Render } from '@nestjs/common';
import { SawggerService } from './sawgger.service';

@Controller('sawgger')
export class SawggerController {
  constructor(private readonly sawggerService: SawggerService) {}

  @Get()
  @Render('admin/swagger/index')
  getSwagger() {
    return this.sawggerService.getSwagger();
  }
}
