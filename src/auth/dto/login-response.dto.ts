import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  country: string;
}

class Headers {
  @ApiProperty({
    type: 'string',
    default: 'application/json',
  })
  'Content-Type': string;
}

class IBody {
  @ApiProperty({
    type: UserInfo,
  })
  userInfo: UserInfo;
}

export class LoginResponseDto {
  @ApiProperty({
    type: 'number',
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    type: IBody,
  })
  body: IBody;

  @ApiProperty()
  token: string;

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  isBase64Encoded: boolean;

  @ApiProperty({
    type: Headers,
  })
  headers: Headers;
}
