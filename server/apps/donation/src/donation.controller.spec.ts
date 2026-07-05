import { Test, TestingModule } from '@nestjs/testing';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

describe('DonationController', () => {
  let donationController: DonationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DonationController],
      providers: [DonationService],
    }).compile();

    donationController = app.get<DonationController>(DonationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(donationController.getHello()).toBe('Hello World!');
    });
  });
});
