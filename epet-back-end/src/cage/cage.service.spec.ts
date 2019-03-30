import { Test, TestingModule } from '@nestjs/testing';
import { CageService } from './cage.service';

describe('CageService', () => {
  let service: CageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CageService],
    }).compile();

    service = module.get<CageService>(CageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
