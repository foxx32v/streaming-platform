require('dotenv').config({ path: './apps/auth/.env' });
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { HttpExceptionFilter } from './common/helper/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();