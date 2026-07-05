import { Test, TestingModule } from '@nestjs/testing';
import { TranscodingWorkerController } from './transcoding-worker.controller';
import { TranscodingWorkerService } from './transcoding-worker.service';

describe('TranscodingWorkerController', () => {
  let transcodingWorkerController: TranscodingWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TranscodingWorkerController],
      providers: [TranscodingWorkerService],
    }).compile();

    transcodingWorkerController = app.get<TranscodingWorkerController>(TranscodingWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(transcodingWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
