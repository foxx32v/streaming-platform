import { Controller, Get } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';

@Controller()
export class ChatServiceController {
  constructor(private readonly chatServiceService: ChatServiceService) {}

  @Get()
  getHello(): string {
    return this.chatServiceService.getHello();
  }
}
