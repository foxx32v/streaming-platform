import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CONFIG } from './kafka.config';
import { EmitUserCreateDTO, EmitUserDeleteDTO, EmitUserUpdateDTO } from './kafka.dto';

@Injectable()
export class KafkaService implements OnModuleInit {
    constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

    async onModuleInit() {
        await this.client.connect();
    }

    emitUserCreated(data: EmitUserCreateDTO) {
        this.client.emit(KAFKA_CONFIG.TOPICS.USER_CREATED, data);
    }

    emitUserUpdated(data: EmitUserUpdateDTO) {
        this.client.emit(KAFKA_CONFIG.TOPICS.USER_UPDATED, data);
    }

    emitUserDeleted(data: EmitUserDeleteDTO) {
        this.client.emit(KAFKA_CONFIG.TOPICS.USER_DELETED, data);
    }
}