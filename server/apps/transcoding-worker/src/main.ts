import { NestFactory } from '@nestjs/core';
import { TranscodingWorkerModule } from './transcoding-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(TranscodingWorkerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
