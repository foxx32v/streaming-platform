import { Injectable } from '@nestjs/common';

@Injectable()
export class ModerationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
