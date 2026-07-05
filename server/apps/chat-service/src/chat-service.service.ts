import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
