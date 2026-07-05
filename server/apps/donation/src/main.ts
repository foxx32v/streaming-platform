import { NestFactory } from '@nestjs/core';
import { DonationModule } from './donation.module';

async function bootstrap() {
  const app = await NestFactory.create(DonationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
