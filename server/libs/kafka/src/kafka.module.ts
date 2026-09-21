import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_OPTIONS } from './kafka.optionObject';

@Module({
  imports: [ClientsModule.register([KAFKA_OPTIONS])],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
