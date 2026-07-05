import { Module } from '@nestjs/common';
import { TranscodingWorkerController } from './transcoding-worker.controller';
import { TranscodingWorkerService } from './transcoding-worker.service';

@Module({
  imports: [],
  controllers: [TranscodingWorkerController],
  providers: [TranscodingWorkerService],
})
export class TranscodingWorkerModule {}
