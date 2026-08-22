require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ServiceInit } from './common/helper/service.init';


async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    await ServiceInit()
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();