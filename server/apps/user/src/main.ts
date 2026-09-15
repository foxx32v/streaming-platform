import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ServiceInit } from './common/urils';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await ServiceInit()
  await app.listen(process.env.USER_PORT ?? 3004);
}
bootstrap();
