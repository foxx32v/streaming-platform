import { Test, TestingModule } from '@nestjs/testing';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';

describe('ModerationController', () => {
  let moderationController: ModerationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModerationController],
      providers: [ModerationService],
    }).compile();

    moderationController = app.get<ModerationController>(ModerationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moderationController.getHello()).toBe('Hello World!');
    });
  });
});
