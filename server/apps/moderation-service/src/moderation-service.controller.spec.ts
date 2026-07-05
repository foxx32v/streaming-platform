import { Test, TestingModule } from '@nestjs/testing';
import { ModerationServiceController } from './moderation-service.controller';
import { ModerationServiceService } from './moderation-service.service';

describe('ModerationServiceController', () => {
  let moderationServiceController: ModerationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModerationServiceController],
      providers: [ModerationServiceService],
    }).compile();

    moderationServiceController = app.get<ModerationServiceController>(ModerationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moderationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
