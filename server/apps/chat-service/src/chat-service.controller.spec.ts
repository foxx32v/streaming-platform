import { Test, TestingModule } from '@nestjs/testing';
import { ChatServiceController } from './chat-service.controller';
import { ChatServiceService } from './chat-service.service';

describe('ChatServiceController', () => {
  let chatServiceController: ChatServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatServiceController],
      providers: [ChatServiceService],
    }).compile();

    chatServiceController = app.get<ChatServiceController>(ChatServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatServiceController.getHello()).toBe('Hello World!');
    });
  });
});
