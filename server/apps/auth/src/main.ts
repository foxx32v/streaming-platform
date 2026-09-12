require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ServiceInit } from './common/helper/service.init';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    await ServiceInit()
    await app.listen(process.env.AUTH_PORT ?? 3000, '0.0.0.0');
}
bootstrap();