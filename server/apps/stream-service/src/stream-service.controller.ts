import { Controller, Get } from '@nestjs/common';
import { StreamServiceService } from './stream-service.service';

@Controller()
export class StreamServiceController {
  constructor(private readonly streamServiceService: StreamServiceService) {}

  @Get()
  getHello(): string {
    return this.streamServiceService.getHello();
  }
}
