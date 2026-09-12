require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { StreamModule } from './stream.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamModule);
  await app.listen(process.env.STREAM_PORT ?? 3003);
}
bootstrap();
