import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

describe('VideoController', () => {
  let videoController: VideoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    }).compile();

    videoController = app.get<VideoController>(VideoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(videoController.getHello()).toBe('Hello World!');
    });
  });
});
