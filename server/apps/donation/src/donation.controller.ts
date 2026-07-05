import { Controller, Get } from '@nestjs/common';
import { DonationService } from './donation.service';

@Controller()
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  getHello(): string {
    return this.donationService.getHello();
  }
}
