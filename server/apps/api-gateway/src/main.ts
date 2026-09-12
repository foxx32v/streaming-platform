require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { corsObject } from './common/helper/';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.enableCors(corsObject);
  await app.listen(process.env.GATEWAY_PORT ?? 3002, '0.0.0.0');
}
bootstrap();
