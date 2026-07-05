import { NestFactory } from '@nestjs/core';
import { StreamServiceModule } from './stream-service.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
