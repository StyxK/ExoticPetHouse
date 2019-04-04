import { Test, TestingModule } from '@nestjs/testing';
import { PetActivityController } from './petactivity.controller';

describe('Petactivity Controller', () => {
  let controller: PetActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetActivityController],
    }).compile();

    controller = module.get<PetActivityController>(PetActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
