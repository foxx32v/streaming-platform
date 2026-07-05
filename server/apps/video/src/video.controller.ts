import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getHello(): string {
    return this.videoService.getHello();
  }
}
