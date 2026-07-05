import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  getHello(): string {
    return 'Hello World!';
  }
}
