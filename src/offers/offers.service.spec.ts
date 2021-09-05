import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersService],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllOffers', () => {
    const mockRouteInfo = {
      startLatitude: 48.870377,
      startLongitude: 2.370615,
      endLatitude: 48.882719,
      endLongitude: 2.322451,
    };

    const response = ['statusCode', 'body', 'isBase64Encoded', 'headers'];
    jest.mock('../hepers/index', () => {
      return {
        default: {
          post: jest.fn((mockRouteInfo) => Promise.resolve(response)),
        },
      };
    });
    it('should return all offers', async () => {
      const allOffers = await service.getAllOffers(mockRouteInfo);
      expect(Object.keys(allOffers)).toEqual(response);
    });
  });
});
