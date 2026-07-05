import { Controller, Get } from '@nestjs/common';
import { RecommendationServiceService } from './recommendation-service.service';

@Controller()
export class RecommendationServiceController {
  constructor(private readonly recommendationServiceService: RecommendationServiceService) {}

  @Get()
  getHello(): string {
    return this.recommendationServiceService.getHello();
  }
}
