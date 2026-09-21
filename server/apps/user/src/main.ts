import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ServiceInit } from './common/urils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user-service',
                brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            },
            consumer: {
                groupId: 'user-consumer',
            },
        },
    });
    await ServiceInit()
    await app.startAllMicroservices();
    await app.listen(process.env.USER_PORT ?? 3004);
}
bootstrap();
