import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationService {
  getHello(): string {
    return 'Hello World!';
  }
}
