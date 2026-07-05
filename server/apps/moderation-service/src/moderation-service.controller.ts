import { Controller, Get } from '@nestjs/common';
import { ModerationServiceService } from './moderation-service.service';

@Controller()
export class ModerationServiceController {
  constructor(private readonly moderationServiceService: ModerationServiceService) {}

  @Get()
  getHello(): string {
    return this.moderationServiceService.getHello();
  }
}
