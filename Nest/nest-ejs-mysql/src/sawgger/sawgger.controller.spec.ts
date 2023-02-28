import { Test, TestingModule } from '@nestjs/testing';
import { SawggerController } from './sawgger.controller';

describe('SawggerController', () => {
  let controller: SawggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SawggerController],
    }).compile();

    controller = module.get<SawggerController>(SawggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
