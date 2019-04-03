import { Test, TestingModule } from '@nestjs/testing';
import { StoreownerService } from './storeowner.service';

describe('StoreownerService', () => {
  let service: StoreownerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreownerService],
    }).compile();

    service = module.get<StoreownerService>(StoreownerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
