import { NestFactory } from '@nestjs/core';
import { VideoModule } from './video.module';

async function bootstrap() {
  const app = await NestFactory.create(VideoModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
