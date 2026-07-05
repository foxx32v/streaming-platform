import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationServiceController } from './recommendation-service.controller';
import { RecommendationServiceService } from './recommendation-service.service';

describe('RecommendationServiceController', () => {
  let recommendationServiceController: RecommendationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationServiceController],
      providers: [RecommendationServiceService],
    }).compile();

    recommendationServiceController = app.get<RecommendationServiceController>(RecommendationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recommendationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
