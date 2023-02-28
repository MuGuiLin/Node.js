import { Injectable } from '@nestjs/common';

@Injectable()
export class SawggerService {
  getSwagger() {
    return {
      url: 'https://swagger.io',
      npm: 'https://www.npmjs.com/package/@nestjs/swagger',
    };
  }
}
