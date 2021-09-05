import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const apiResponse = ['statusCode', 'body', 'isBase64Encoded', 'headers'];

  describe('registerUser', () => {
    const registerDto = {
      email: 'nic@gmail.com',
      firstName: 'Kim',
      lastName: 'Hernandez',
      birthDate: '1996-05-17',
      phoneNumber: '+33667182291',
      isPhoneNumberVerified: true,
      country: 'France',
    };

    jest.mock('../hepers/index', () => {
      return {
        default: {
          post: jest.fn((registerDto) => Promise.resolve(apiResponse)),
        },
      };
    });

    it('should retun a RegisterResponse', async () => {
      const response = await service.registerUser(registerDto);
      expect(Object.keys(response)).toEqual(apiResponse);
    });
  });

  describe('loginUser', () => {
    const loginDto = {
      email: 'nic@gmail.com',
      phoneNumber: '+33667182291',
    };

    const loginResponse = ['statusCode', 'headers', 'isBase64Encoded', 'body'];

    jest.mock('../hepers/index', () => {
      return {
        default: {
          post: jest.fn((loginDto) => Promise.resolve(loginResponse)),
        },
      };
    });

    it('should retun a loginResponse', async () => {
      const response = await service.loginUser(loginDto);
      expect(Object.keys(response)).toEqual(loginResponse);
    });
  });
});
