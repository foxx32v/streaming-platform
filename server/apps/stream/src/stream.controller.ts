import { Controller, Get } from '@nestjs/common';
import { StreamService } from './stream.service';
import { json } from 'stream/consumers';

@Controller()
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get()
  getHello() {
    return {}
  }
}
