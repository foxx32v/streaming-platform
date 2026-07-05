import { Injectable } from '@nestjs/common';

@Injectable()
export class TranscodingWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
