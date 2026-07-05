import { Controller, Get } from '@nestjs/common';
import { DonationServiceService } from './donation-service.service';

@Controller()
export class DonationServiceController {
  constructor(private readonly donationServiceService: DonationServiceService) {}

  @Get()
  getHello(): string {
    return this.donationServiceService.getHello();
  }
}
