import { Controller, Get } from '@nestjs/common';
import { TranscodingWorkerService } from './transcoding-worker.service';

@Controller()
export class TranscodingWorkerController {
  constructor(private readonly transcodingWorkerService: TranscodingWorkerService) {}

  @Get()
  getHello(): string {
    return this.transcodingWorkerService.getHello();
  }
}
