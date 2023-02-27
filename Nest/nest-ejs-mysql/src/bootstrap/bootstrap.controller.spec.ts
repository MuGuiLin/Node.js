import { Test, TestingModule } from '@nestjs/testing';
import { BootstrapController } from './bootstrap.controller';

describe('BootstrapController', () => {
  let controller: BootstrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BootstrapController],
    }).compile();

    controller = module.get<BootstrapController>(BootstrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
