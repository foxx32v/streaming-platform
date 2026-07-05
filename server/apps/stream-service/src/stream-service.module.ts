import { Module } from '@nestjs/common';
import { StreamServiceController } from './stream-service.controller';
import { StreamServiceService } from './stream-service.service';

@Module({
  imports: [],
  controllers: [StreamServiceController],
  providers: [StreamServiceService],
})
export class StreamServiceModule {}
