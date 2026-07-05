import { Controller, Get } from '@nestjs/common';
import { ModerationService } from './moderation.service';

@Controller()
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get()
  getHello(): string {
    return this.moderationService.getHello();
  }
}
