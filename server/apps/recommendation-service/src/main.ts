import { NestFactory } from '@nestjs/core';
import { RecommendationServiceModule } from './recommendation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RecommendationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
