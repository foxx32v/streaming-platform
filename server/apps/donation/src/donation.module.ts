import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

@Module({
  imports: [],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
