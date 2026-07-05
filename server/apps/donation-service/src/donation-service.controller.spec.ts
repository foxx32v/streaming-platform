import { Test, TestingModule } from '@nestjs/testing';
import { DonationServiceController } from './donation-service.controller';
import { DonationServiceService } from './donation-service.service';

describe('DonationServiceController', () => {
  let donationServiceController: DonationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DonationServiceController],
      providers: [DonationServiceService],
    }).compile();

    donationServiceController = app.get<DonationServiceController>(DonationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(donationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
