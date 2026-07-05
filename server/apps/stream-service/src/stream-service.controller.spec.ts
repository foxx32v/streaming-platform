import { Test, TestingModule } from '@nestjs/testing';
import { StreamServiceController } from './stream-service.controller';
import { StreamServiceService } from './stream-service.service';

describe('StreamServiceController', () => {
  let streamServiceController: StreamServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StreamServiceController],
      providers: [StreamServiceService],
    }).compile();

    streamServiceController = app.get<StreamServiceController>(StreamServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(streamServiceController.getHello()).toBe('Hello World!');
    });
  });
});
