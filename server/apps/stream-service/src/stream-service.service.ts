import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
