import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
