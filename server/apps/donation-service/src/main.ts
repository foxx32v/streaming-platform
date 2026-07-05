import { NestFactory } from '@nestjs/core';
import { DonationServiceModule } from './donation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DonationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
