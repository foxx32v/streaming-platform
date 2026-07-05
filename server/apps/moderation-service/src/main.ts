import { NestFactory } from '@nestjs/core';
import { ModerationServiceModule } from './moderation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ModerationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
