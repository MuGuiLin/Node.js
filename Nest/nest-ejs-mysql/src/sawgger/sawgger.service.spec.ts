import { Test, TestingModule } from '@nestjs/testing';
import { SawggerService } from './sawgger.service';

describe('SawggerService', () => {
  let service: SawggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SawggerService],
    }).compile();

    service = module.get<SawggerService>(SawggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
