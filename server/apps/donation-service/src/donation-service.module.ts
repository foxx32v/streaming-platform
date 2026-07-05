import { Module } from '@nestjs/common';
import { DonationServiceController } from './donation-service.controller';
import { DonationServiceService } from './donation-service.service';

@Module({
  imports: [],
  controllers: [DonationServiceController],
  providers: [DonationServiceService],
})
export class DonationServiceModule {}
