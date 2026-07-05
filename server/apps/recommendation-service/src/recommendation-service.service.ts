import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
