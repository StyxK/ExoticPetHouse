import { Test, TestingModule } from '@nestjs/testing';
import { StoreownerController } from './storeowner.controller';

describe('Storeowner Controller', () => {
  let controller: StoreownerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreownerController],
    }).compile();

    controller = module.get<StoreownerController>(StoreownerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
