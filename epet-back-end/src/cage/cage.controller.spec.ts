import { Test, TestingModule } from '@nestjs/testing';
import { CageController } from './cage.controller';

describe('Cage Controller', () => {
  let controller: CageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CageController],
    }).compile();

    controller = module.get<CageController>(CageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
