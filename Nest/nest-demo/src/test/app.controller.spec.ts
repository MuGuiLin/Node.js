import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "<h1 style="color:blue;text-align:center;">Hello Nest World!</h1> <hr/>"', () => {
      expect(appController.getHello()).toBe(
        '<h1 style="color:blue;text-align:center;">Hello Nest World!</h1> <hr/>',
      );
    });
  });
});
