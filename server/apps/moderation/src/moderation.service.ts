import { Injectable } from '@nestjs/common';

@Injectable()
export class ModerationService {
  getHello(): string {
    return 'Hello World!';
  }
}
