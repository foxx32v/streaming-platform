import { Module } from '@nestjs/common';
import { RecommendationServiceController } from './recommendation-service.controller';
import { RecommendationServiceService } from './recommendation-service.service';

@Module({
  imports: [],
  controllers: [RecommendationServiceController],
  providers: [RecommendationServiceService],
})
export class RecommendationServiceModule {}
