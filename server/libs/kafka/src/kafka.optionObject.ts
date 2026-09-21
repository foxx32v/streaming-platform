import { KafkaOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from './kafka.config';

export interface KafkaClientOptions extends KafkaOptions {
    name: string;
}

export const KAFKA_OPTIONS: KafkaClientOptions = {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
    client: {
    clientId: KAFKA_CONFIG.CLIENT_ID,
    brokers: [KAFKA_CONFIG.BROKER]},
    producer: {
    allowAutoTopicCreation: true,
    }},
}