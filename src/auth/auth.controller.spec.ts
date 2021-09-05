import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const RegisterResponse = {
  statusCode: 200,
  body: {
    userExists: true,
    user: {
      ID: 21385,
      email: 'nic@gmail.com',
      firstName: 'Kim',
      lastName: 'Hernandez',
      birthDate: '1996-05-17',
      phoneNumber: '+33667182291',
      isActive: 1,
    },
    userToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA3NDYzMTgsImV4cCI6MTY2MjI4MjMxOH0.dJzaWdFrQszdC67gMFu0YydjJDBYkqnZ-hsI9-CWd3Y',
  },
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json',
  },
};

const loginResponse = {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  isBase64Encoded: false,
  body: {
    userInfo: {
      email: 'nic@gmail.com',
      firstname: 'Kim',
      lastname: 'Hernandez',
      phonenumber: '+33667182291',
      country: 'France',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIxMzg1LCJ1c2VybmFtZSI6Im5pY0BnbWFpbC5jb20iLCJlbWFpbCI6Im5pY0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJLaW0iLCJsYXN0bmFtZSI6Ikhlcm5hbmRleiIsInJvbGVzIjpbIlVTRVIiXSwicHJvdmlkZXJDb2RlIjpudWxsLCJpYXQiOjE2MzA3MjY1NzMsImV4cCI6MTY2MjI2MjU3M30.Skq064OAruXQuP0T5biSKHcWrft_3cBOuJ1v4Lh_DJk',
  },
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    registerUser: jest.fn((dto) => {
      return RegisterResponse;
    }),

    loginUser: jest.fn((dto) => {
      return loginResponse;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('RegisterUser', () => {
    const registerDto = {
      email: 'nic@gmail.com',
      firstName: 'Kim',
      lastName: 'Hernandez',
      birthDate: '1996-05-17',
      phoneNumber: '+33667182291',
      isPhoneNumberVerified: true,
      country: 'France',
    };
    it('Should return register a user', () => {
      expect(Object.keys(controller.registerUser(registerDto))).toEqual(
        Object.keys(RegisterResponse),
      );
      expect(mockAuthService.registerUser).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('loginUser', () => {
    const loginDto = {
      email: 'nic@gmail.com',
      phoneNumber: '+33667182291',
    };

    it('should return a loginResponse ', () => {
      expect(Object.keys(controller.loginUser(loginDto))).toEqual(
        Object.keys(loginResponse),
      );
      expect(mockAuthService.loginUser).toHaveBeenCalledWith(loginDto);
    });
  });
});
