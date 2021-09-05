import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe('OffersController', () => {
  let controller: OffersController;

  const mockOfferService = {
    getAllOffers: jest.fn((dto) => {
      return;
      {
        statusCode: 200;
        body: [
          {
            offerId: '0763c57a-2881-4602-8f6f-0deff15a3c63',
            providerCode: 'phocea',
            category: 'Eco',
            price: 32.97,
            arrivalTime: 1260,
            currency: '€',
            internalDeeplinkUrl: false,
          },
        ];
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [OffersService],
    })
      .overrideProvider(OffersService)
      .useValue(mockOfferService)
      .compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllOffers', () => {
    const dto = {
      startLatitude: 48.870377,
      startLongitude: 2.370615,
      endLatitude: 48.882719,
      endLongitude: 2.322451,
    };

    it('should return offers', () => {
      controller.getAllOffers(dto);
      expect(mockOfferService.getAllOffers).toBeCalledWith(dto);
    });
  });
});
